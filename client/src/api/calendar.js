export default async function getCalendar() {
  try {
    const res = await fetch('https://hale-treat-133723.appspot.com/calendar', {
      method: 'GET',
    })
    const { data } = await res.json()
    if (res.status !== 200) {
      throw new Error({
        type: 'A network error occured',
        status: res.status,
      })
    }
    return await data
  } catch (e) {
    throw e
  }
}
