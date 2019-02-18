require("dotenv").config();
import Express from "express";
import ExpressSession from "express-session";
import fs from "fs";
import session from "express-session";
import randomString from "randomstring";
import { google } from "googleapis";

// express set up, handles request, response easily
const app = Express();

const expressSecret = process.env.CSRF_SECRET || "";

app.use(
  ExpressSession({
    secret: expressSecret,
    resave: false,
    saveUninitialized: true
  })
);
// setting up port and redirect url from process.env
// makes it easier to deploy later
const port = process.env.PORT || 8000;
// const redirect_uri = process.env.HOST + "/redirect";

const auth = require("./credentials.json");
const { client_secret, client_id, redirect_uris } = auth.web;

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = process.env.TOKEN_PATH || "";

// serves up the contnests of the /views folder as static
app.use(Express.static("views"));

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const oauthUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: SCOPES
});

oauth2Client.on("tokens", (tokens: any) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

// initializes session
app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.get("/login", (req, res) => {
  // generate that csrf_string for your "state" parameter
  if (req.session) {
    req.session.csrf_string = randomString.generate();
  }
  // construct the GitHub URL you redirect your user to.
  // qs.stringify is a method that creates foo=bar&bar=baz
  // type of string for you.
  // redirect user with express
  res.redirect(oauthUrl);
});

function authorize(credentials: any, callback: Function) {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err: Error, token: any) => {
    if (err) throw err;
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

app.get("/calendar", async (req, res) => {
  authorize(auth.web, (auth: any) => {
    const calendar = google.calendar({ version: "v3", auth });
    calendar.events.list(
      {
        auth,
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 20,
        singleEvents: true,
        orderBy: "startTime"
      },
      function(err: any, response: any) {
        if (err) {
          console.log("The API returned an error: " + err);
          return res.status(500).send(err);
        }
        return res.status(200).json(response);
      }
    );
  });
});

app.all("/auth", async (req, res) => {
  const code = req.query.code;
  const returnedState = req.query.state;
  const { tokens } = await oauth2Client.getToken(code);
  fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err: Error) => {
    if (err) console.error(err);
  });
  oauth2Client.setCredentials(tokens);
  res.sendFile(__dirname + "/views" + "/index.html");
});

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening at port " + port);
});
