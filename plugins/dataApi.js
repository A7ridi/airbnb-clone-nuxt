export default function (context, inject) {
  const appId = 'MXUS6CX3T9'
  const apiKey = '6daf03af3e77d03b1f01704636789b0f'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
    getUsersByHomeId,
  })

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          {
            // headers: {
            //   'X-Algolia-API-Key': apiKey,
            //   'X-Algolia-Application-Id': appId,
            // },
            headers,
          }
        )
      )
    } catch (error) {
      return getErrorRes(error)
    }
    // const json = await res.json()
    // return json
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `homeId: ${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      )
    } catch (error) {
      return getErrorRes(error)
    }
  }

  async function getUsersByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId: ${homeId}`,
            attributesToHighlight: [],
          }),
        })
      )
    } catch (error) {
      return getErrorRes(error)
    }
  }

  async function unWrap(res) {
    const json = await res.json()
    const { ok, status, statusText } = res
    return {
      json,
      ok,
      status,
      statusText,
    }
  }
  function getErrorRes(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
