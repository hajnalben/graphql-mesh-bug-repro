import { getBuiltGraphSDK } from "./.graphclient";

const { GetUserSubs } = getBuiltGraphSDK({
  url: "https://api.goldsky.com/api/public/project_clsnd6xsoma5j012qepvucfpp/subgraphs/alfafrens/prod/gn",
});

/**
 * This version of query will be the same after being transformed by @graphprotocol/client-auto-pagination transformer
 */
export async function runQueryV1() {
  const subs1 = await GetUserSubs({
    id: "0x0064432d3ba92c27cc661a6751187c5fd9bbd5e3",
    first: 100
  });

  // this should be around a 100 as we are limiting the query to 100
  console.log(subs1.channelMembers.length);

  return subs1.channelMembers.length
}

/**
 * This version of query WILL BE CHANGED after being transformed by @graphprotocol/client-auto-pagination transformer
 */
export async function runQueryV2() {
  const subs2 = await GetUserSubs({
    id: "0x0064432d3ba92c27cc661a6751187c5fd9bbd5e3",
    first: 3000,
    skip: 0,
    orderBy: "lastClaimedTimestamp",
    orderDirection: "desc",
  });

  // This should be around a 1000 for this user
  console.log(subs2.channelMembers.length);

  return subs2.channelMembers.length
}