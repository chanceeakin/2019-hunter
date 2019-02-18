"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var fs_1 = __importDefault(require("fs"));
var express_session_2 = __importDefault(require("express-session"));
var randomstring_1 = __importDefault(require("randomstring"));
var googleapis_1 = require("googleapis");
// express set up, handles request, response easily
var app = express_1.default();
var expressSecret = process.env.CSRF_SECRET || "";
app.use(express_session_1.default({
    secret: expressSecret,
    resave: false,
    saveUninitialized: true
}));
// setting up port and redirect url from process.env
// makes it easier to deploy later
var port = process.env.PORT || 8000;
// const redirect_uri = process.env.HOST + "/redirect";
var auth = require("./credentials.json");
var _a = auth.web, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
// If modifying these scopes, delete token.json.
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
var TOKEN_PATH = process.env.TOKEN_PATH || "";
// serves up the contnests of the /views folder as static
app.use(express_1.default.static("views"));
var oauth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
var oauthUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    scope: SCOPES
});
oauth2Client.on("tokens", function (tokens) {
    if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
});
// initializes session
app.use(express_session_2.default({
    secret: randomstring_1.default.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.get("/login", function (req, res) {
    // generate that csrf_string for your "state" parameter
    if (req.session) {
        req.session.csrf_string = randomstring_1.default.generate();
    }
    // construct the GitHub URL you redirect your user to.
    // qs.stringify is a method that creates foo=bar&bar=baz
    // type of string for you.
    // redirect user with express
    res.redirect(oauthUrl);
});
function authorize(credentials, callback) {
    var client_secret = credentials.client_secret, client_id = credentials.client_id, redirect_uris = credentials.redirect_uris;
    var oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs_1.default.readFile(TOKEN_PATH, function (err, token) {
        if (err)
            throw err;
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
app.get("/calendar", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        authorize(auth.web, function (auth) {
            var calendar = googleapis_1.google.calendar({ version: "v3", auth: auth });
            calendar.events.list({
                auth: auth,
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                maxResults: 20,
                singleEvents: true,
                orderBy: "startTime"
            }, function (err, response) {
                if (err) {
                    console.log("The API returned an error: " + err);
                    return res.status(500).send(err);
                }
                return res.status(200).json(response);
            });
        });
        return [2 /*return*/];
    });
}); });
app.all("/auth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var code, returnedState, tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                returnedState = req.query.state;
                return [4 /*yield*/, oauth2Client.getToken(code)];
            case 1:
                tokens = (_a.sent()).tokens;
                fs_1.default.writeFile(TOKEN_PATH, JSON.stringify(tokens), function (err) {
                    if (err)
                        console.error(err);
                });
                oauth2Client.setCredentials(tokens);
                res.sendFile(__dirname + "/views" + "/index.html");
                return [2 /*return*/];
        }
    });
}); });
app.get("/", function (req, res, next) {
    res.sendFile(__dirname + "/views" + "/index.html");
});
app.listen(port, function () {
    console.log("Server listening at port " + port);
});
