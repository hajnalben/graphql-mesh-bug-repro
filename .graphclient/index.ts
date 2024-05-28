// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { AlfaFrensTypes } from './sources/AlfaFrens/types';
import * as importedModule$0 from "./sources/AlfaFrens/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: string; output: string; }
  BigInt: { input: string; output: string; }
  Bytes: { input: string; output: string; }
  Int8: { input: any; output: any; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Channel = {
  /**
   * The address of the deployed channel contract.
   *
   */
  id: Scalars['Bytes']['output'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt']['output'];
  /**
   * The account that executed the creation of the channel.
   *
   */
  creator: Scalars['Bytes']['output'];
  /**
   * The content creator of the channel.
   *
   */
  owner: Scalars['Bytes']['output'];
  /**
   * The flow rate required to subscribe to this channel.
   *
   */
  subscriptionFlowRatePrice: Scalars['BigInt']['output'];
  /**
   * The percentage of the subscription flow rate that goes to the creator.
   *
   */
  creatorSubscriptionPercentage: Scalars['BigInt']['output'];
  /**
   * Pool address associated with this channel.
   *
   */
  poolAddress: Scalars['Bytes']['output'];
  /**
   * Total number of active subscribers
   *
   */
  numberOfSubscribers: Scalars['Int']['output'];
  /**
   * Total number of stakers
   *
   */
  numberOfStakers: Scalars['Int']['output'];
  /**
   * The total amount of $FAN tokens currently staked in this channel.
   *
   */
  currentStaked: Scalars['BigInt']['output'];
  /**
   * The total amount of $FAN tokens claimed in this channel.
   *
   */
  totalClaimed: Scalars['BigInt']['output'];
  /**
   * Estimated earnings per second per FAN staked.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  estimatedEarningsPerSecond: Scalars['BigInt']['output'];
  /**
   * The ratio of subscription income to amount of FAN staked: `totalSubscriptionFlowRate` * SCALING_FACTOR / `currentStaked`.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  incomeToStakeRatio: Scalars['BigInt']['output'];
  /**
   * The ratio of FAN staked to subscription income: `currentStaked` * SCALING_FACTOR / `totalSubscriptionFlowRate`.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  stakeToIncomeRatio: Scalars['BigInt']['output'];
  /**
   * The cashback flowrate from the pool to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowRate: Scalars['BigInt']['output'];
  /**
   * Total subscription cashback streamed to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowAmount: Scalars['BigInt']['output'];
  /**
   * The current in flow rate of the channel.
   *
   */
  totalSubscriptionFlowRate: Scalars['BigInt']['output'];
  /**
   * Total subscription inflows streamed to channel.
   *
   */
  totalSubscriptionInflowAmount: Scalars['BigInt']['output'];
  /**
   * The subscribers of this channel.
   *
   */
  subscribers: Array<ChannelMember>;
};


export type ChannelsubscribersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
};

export type ChannelMember = {
  /**
   * The concatenated address of the channel and subscriber:
   * channel.id.concat(user.id)
   *
   */
  id: Scalars['Bytes']['output'];
  /**
   * The status of the channel member, the possible states are:
   * "INACTIVE" | "ACTIVE" | "STOPPED" | "LIQUIDATED"
   *
   */
  status: Scalars['String']['output'];
  /**
   * A boolean indicating whether the user is subscribed to this channel.
   *
   */
  isSubscribed: Scalars['Boolean']['output'];
  /**
   * Timestamp of last the subscription start (i.e. the last time `isSubscribed` turned to true).
   *
   */
  lastSubscribedTimestamp?: Maybe<Scalars['BigInt']['output']>;
  /**
   * A boolean indicating whether the user is staked to this channel.
   *
   */
  isStaked: Scalars['Boolean']['output'];
  /**
   * The amount of $FAN tokens currently staked by this user to this channel.
   *
   */
  currentStaked: Scalars['BigInt']['output'];
  /**
   * The total amount of $FAN tokens claimed by this user in this channel.
   *
   */
  totalClaimed: Scalars['BigInt']['output'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt']['output'];
  /**
   * The timestamp this user claimed for this channel.
   *
   */
  lastClaimedTimestamp: Scalars['BigInt']['output'];
  /**
   * The current outflow rate from the channel subscriber to the channels (excludes external flows).
   *
   */
  totalSubscriptionOutflowRate: Scalars['BigInt']['output'];
  /**
   * Total subscription amount streamed to the channel until last updated timestamp.
   *
   */
  totalSubscriptionOutflowAmount: Scalars['BigInt']['output'];
  /**
   * The channel that this subscriber is subscribed to.
   *
   */
  channel: Channel;
  /**
   * The subscriber of this channel.
   *
   */
  subscriber: User;
};

export type ChannelMember_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  isSubscribed?: InputMaybe<Scalars['Boolean']['input']>;
  isSubscribed_not?: InputMaybe<Scalars['Boolean']['input']>;
  isSubscribed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isSubscribed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  lastSubscribedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastSubscribedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastSubscribedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  isStaked?: InputMaybe<Scalars['Boolean']['input']>;
  isStaked_not?: InputMaybe<Scalars['Boolean']['input']>;
  isStaked_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isStaked_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  currentStaked?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastClaimedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastClaimedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  channel?: InputMaybe<Scalars['String']['input']>;
  channel_not?: InputMaybe<Scalars['String']['input']>;
  channel_gt?: InputMaybe<Scalars['String']['input']>;
  channel_lt?: InputMaybe<Scalars['String']['input']>;
  channel_gte?: InputMaybe<Scalars['String']['input']>;
  channel_lte?: InputMaybe<Scalars['String']['input']>;
  channel_in?: InputMaybe<Array<Scalars['String']['input']>>;
  channel_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  channel_contains?: InputMaybe<Scalars['String']['input']>;
  channel_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_not_contains?: InputMaybe<Scalars['String']['input']>;
  channel_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_starts_with?: InputMaybe<Scalars['String']['input']>;
  channel_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  channel_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_ends_with?: InputMaybe<Scalars['String']['input']>;
  channel_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  channel_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  channel_?: InputMaybe<Channel_filter>;
  subscriber?: InputMaybe<Scalars['String']['input']>;
  subscriber_not?: InputMaybe<Scalars['String']['input']>;
  subscriber_gt?: InputMaybe<Scalars['String']['input']>;
  subscriber_lt?: InputMaybe<Scalars['String']['input']>;
  subscriber_gte?: InputMaybe<Scalars['String']['input']>;
  subscriber_lte?: InputMaybe<Scalars['String']['input']>;
  subscriber_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subscriber_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subscriber_contains?: InputMaybe<Scalars['String']['input']>;
  subscriber_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_contains?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_starts_with?: InputMaybe<Scalars['String']['input']>;
  subscriber_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_ends_with?: InputMaybe<Scalars['String']['input']>;
  subscriber_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subscriber_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subscriber_?: InputMaybe<User_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ChannelMember_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ChannelMember_filter>>>;
};

export type ChannelMember_orderBy =
  | 'id'
  | 'status'
  | 'isSubscribed'
  | 'lastSubscribedTimestamp'
  | 'isStaked'
  | 'currentStaked'
  | 'totalClaimed'
  | 'lastUpdatedTimestamp'
  | 'lastClaimedTimestamp'
  | 'totalSubscriptionOutflowRate'
  | 'totalSubscriptionOutflowAmount'
  | 'channel'
  | 'channel__id'
  | 'channel__lastUpdatedTimestamp'
  | 'channel__creator'
  | 'channel__owner'
  | 'channel__subscriptionFlowRatePrice'
  | 'channel__creatorSubscriptionPercentage'
  | 'channel__poolAddress'
  | 'channel__numberOfSubscribers'
  | 'channel__numberOfStakers'
  | 'channel__currentStaked'
  | 'channel__totalClaimed'
  | 'channel__estimatedEarningsPerSecond'
  | 'channel__incomeToStakeRatio'
  | 'channel__stakeToIncomeRatio'
  | 'channel__totalSubscriptionCashbackFlowRate'
  | 'channel__totalSubscriptionCashbackFlowAmount'
  | 'channel__totalSubscriptionFlowRate'
  | 'channel__totalSubscriptionInflowAmount'
  | 'subscriber'
  | 'subscriber__id'
  | 'subscriber__currentStaked'
  | 'subscriber__totalClaimed'
  | 'subscriber__lastUpdatedTimestamp'
  | 'subscriber__lastClaimedTimestamp'
  | 'subscriber__lastUnstakedTimestamp'
  | 'subscriber__numberOfSubscriptions'
  | 'subscriber__numberOfStakes'
  | 'subscriber__totalSubscriptionOutflowRate'
  | 'subscriber__totalSubscriptionOutflowAmount';

export type Channel_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  subscriptionFlowRatePrice?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionFlowRatePrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subscriptionFlowRatePrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creatorSubscriptionPercentage?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creatorSubscriptionPercentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creatorSubscriptionPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolAddress?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poolAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poolAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  poolAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  numberOfSubscribers?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscribers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfSubscribers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfStakers?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfStakers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentStaked?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  estimatedEarningsPerSecond?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_not?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedEarningsPerSecond_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  estimatedEarningsPerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  incomeToStakeRatio?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_not?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_gt?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_lt?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_gte?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_lte?: InputMaybe<Scalars['BigInt']['input']>;
  incomeToStakeRatio_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  incomeToStakeRatio_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakeToIncomeRatio?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakeToIncomeRatio_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakeToIncomeRatio_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionInflowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionInflowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionInflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subscribers_?: InputMaybe<ChannelMember_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Channel_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Channel_filter>>>;
};

export type Channel_orderBy =
  | 'id'
  | 'lastUpdatedTimestamp'
  | 'creator'
  | 'owner'
  | 'subscriptionFlowRatePrice'
  | 'creatorSubscriptionPercentage'
  | 'poolAddress'
  | 'numberOfSubscribers'
  | 'numberOfStakers'
  | 'currentStaked'
  | 'totalClaimed'
  | 'estimatedEarningsPerSecond'
  | 'incomeToStakeRatio'
  | 'stakeToIncomeRatio'
  | 'totalSubscriptionCashbackFlowRate'
  | 'totalSubscriptionCashbackFlowAmount'
  | 'totalSubscriptionFlowRate'
  | 'totalSubscriptionInflowAmount'
  | 'subscribers';

export type GlobalData = {
  /**
   * An arbitrary ID for the global data.
   *
   */
  id: Scalars['Bytes']['output'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt']['output'];
  /**
   * The total amount of tokens staked in all channels.
   *
   */
  totalStaked: Scalars['BigInt']['output'];
  /**
   * The total amount of tokens staked in all channels.
   *
   */
  totalClaimed: Scalars['BigInt']['output'];
  /**
   * The total subscription flow rate of all channels.
   *
   */
  totalSubscriptionFlowRate: Scalars['BigInt']['output'];
  /**
   * The total amount of tokens streamed to all channels.
   *
   */
  totalSubscriptionFlowAmount: Scalars['BigInt']['output'];
  /**
   * The cashback flowrate from the pool to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowRate: Scalars['BigInt']['output'];
  /**
   * Total subscription cashback streamed to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowAmount: Scalars['BigInt']['output'];
  /**
   * The total number of subscriptions (a single user can have multiple subscriptions to different channels).
   *
   */
  totalNumberOfSubscriptions: Scalars['Int']['output'];
  /**
   * The total number of stakers (a single user can stake in multiple channels).
   *
   */
  totalNumberOfStakers: Scalars['Int']['output'];
  /**
   * The total number of channels/Users.
   *
   */
  totalNumberOfChannels: Scalars['Int']['output'];
};

export type GlobalData_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionCashbackFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionCashbackFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalNumberOfSubscriptions?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_not?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_gt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_lt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_gte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_lte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfSubscriptions_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalNumberOfSubscriptions_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalNumberOfStakers?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_not?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_gt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_lt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_gte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_lte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfStakers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalNumberOfStakers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalNumberOfChannels?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_not?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_gt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_lt?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_gte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_lte?: InputMaybe<Scalars['Int']['input']>;
  totalNumberOfChannels_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalNumberOfChannels_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GlobalData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GlobalData_filter>>>;
};

export type GlobalData_orderBy =
  | 'id'
  | 'lastUpdatedTimestamp'
  | 'totalStaked'
  | 'totalClaimed'
  | 'totalSubscriptionFlowRate'
  | 'totalSubscriptionFlowAmount'
  | 'totalSubscriptionCashbackFlowRate'
  | 'totalSubscriptionCashbackFlowAmount'
  | 'totalNumberOfSubscriptions'
  | 'totalNumberOfStakers'
  | 'totalNumberOfChannels';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  user?: Maybe<User>;
  users: Array<User>;
  channelMember?: Maybe<ChannelMember>;
  channelMembers: Array<ChannelMember>;
  globalData?: Maybe<GlobalData>;
  globalDatas: Array<GlobalData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerychannelArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Channel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Channel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelMemberArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelMembersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GlobalData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  user?: Maybe<User>;
  users: Array<User>;
  channelMember?: Maybe<ChannelMember>;
  channelMembers: Array<ChannelMember>;
  globalData?: Maybe<GlobalData>;
  globalDatas: Array<GlobalData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionchannelArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Channel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Channel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelMemberArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelMembersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GlobalData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type User = {
  /**
   * The address of the user.
   *
   */
  id: Scalars['Bytes']['output'];
  /**
   * The creator channel for this user. Users can only have one creator channel.
   * They also do not need to have a channel to stake/subscribe, etc.
   *
   */
  userChannel?: Maybe<Channel>;
  /**
   * The total amount of $FAN tokens currently staked by this user.
   *
   */
  currentStaked: Scalars['BigInt']['output'];
  /**
   * The total amount of $FAN tokens claimed by this user.
   *
   */
  totalClaimed: Scalars['BigInt']['output'];
  /**
   * Last updated timestamp of the User.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt']['output'];
  /**
   * Last claimed timestamp.
   *
   */
  lastClaimedTimestamp: Scalars['BigInt']['output'];
  /**
   * The last timestamp the user unstaked.
   *
   */
  lastUnstakedTimestamp: Scalars['BigInt']['output'];
  /**
   * The number of channels the user is subscribed to.
   *
   */
  numberOfSubscriptions: Scalars['Int']['output'];
  /**
   * Total number of channels the user is staked to.
   *
   */
  numberOfStakes: Scalars['Int']['output'];
  /**
   * The current outflow rate from the user to all the channels (excludes external flows).
   *
   */
  totalSubscriptionOutflowRate: Scalars['BigInt']['output'];
  /**
   * Total subscription outflows streamed to different channels.
   *
   */
  totalSubscriptionOutflowAmount: Scalars['BigInt']['output'];
  /**
   * The channels that this user is subscribed to.
   *
   */
  channels: Array<ChannelMember>;
};


export type UserchannelsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  userChannel?: InputMaybe<Scalars['String']['input']>;
  userChannel_not?: InputMaybe<Scalars['String']['input']>;
  userChannel_gt?: InputMaybe<Scalars['String']['input']>;
  userChannel_lt?: InputMaybe<Scalars['String']['input']>;
  userChannel_gte?: InputMaybe<Scalars['String']['input']>;
  userChannel_lte?: InputMaybe<Scalars['String']['input']>;
  userChannel_in?: InputMaybe<Array<Scalars['String']['input']>>;
  userChannel_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  userChannel_contains?: InputMaybe<Scalars['String']['input']>;
  userChannel_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_contains?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_starts_with?: InputMaybe<Scalars['String']['input']>;
  userChannel_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_ends_with?: InputMaybe<Scalars['String']['input']>;
  userChannel_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userChannel_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userChannel_?: InputMaybe<Channel_filter>;
  currentStaked?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastClaimedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastClaimedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastClaimedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUnstakedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUnstakedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUnstakedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  numberOfSubscriptions?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfSubscriptions_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfSubscriptions_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfStakes?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_not?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_gt?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_lt?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_gte?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_lte?: InputMaybe<Scalars['Int']['input']>;
  numberOfStakes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numberOfStakes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalSubscriptionOutflowRate?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowRate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowRate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSubscriptionOutflowAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSubscriptionOutflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  channels_?: InputMaybe<ChannelMember_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'userChannel'
  | 'userChannel__id'
  | 'userChannel__lastUpdatedTimestamp'
  | 'userChannel__creator'
  | 'userChannel__owner'
  | 'userChannel__subscriptionFlowRatePrice'
  | 'userChannel__creatorSubscriptionPercentage'
  | 'userChannel__poolAddress'
  | 'userChannel__numberOfSubscribers'
  | 'userChannel__numberOfStakers'
  | 'userChannel__currentStaked'
  | 'userChannel__totalClaimed'
  | 'userChannel__estimatedEarningsPerSecond'
  | 'userChannel__incomeToStakeRatio'
  | 'userChannel__stakeToIncomeRatio'
  | 'userChannel__totalSubscriptionCashbackFlowRate'
  | 'userChannel__totalSubscriptionCashbackFlowAmount'
  | 'userChannel__totalSubscriptionFlowRate'
  | 'userChannel__totalSubscriptionInflowAmount'
  | 'currentStaked'
  | 'totalClaimed'
  | 'lastUpdatedTimestamp'
  | 'lastClaimedTimestamp'
  | 'lastUnstakedTimestamp'
  | 'numberOfSubscriptions'
  | 'numberOfStakes'
  | 'totalSubscriptionOutflowRate'
  | 'totalSubscriptionOutflowAmount'
  | 'channels';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelMember: ResolverTypeWrapper<ChannelMember>;
  ChannelMember_filter: ChannelMember_filter;
  ChannelMember_orderBy: ChannelMember_orderBy;
  Channel_filter: Channel_filter;
  Channel_orderBy: Channel_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GlobalData: ResolverTypeWrapper<GlobalData>;
  GlobalData_filter: GlobalData_filter;
  GlobalData_orderBy: GlobalData_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Channel: Channel;
  ChannelMember: ChannelMember;
  ChannelMember_filter: ChannelMember_filter;
  Channel_filter: Channel_filter;
  Float: Scalars['Float']['output'];
  GlobalData: GlobalData;
  GlobalData_filter: GlobalData_filter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  User: User;
  User_filter: User_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ChannelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lastUpdatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  subscriptionFlowRatePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creatorSubscriptionPercentage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  poolAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  numberOfSubscribers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfStakers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalClaimed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  estimatedEarningsPerSecond?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  incomeToStakeRatio?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stakeToIncomeRatio?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionCashbackFlowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionCashbackFlowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionFlowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionInflowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subscribers?: Resolver<Array<ResolversTypes['ChannelMember']>, ParentType, ContextType, RequireFields<ChannelsubscribersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChannelMemberResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ChannelMember'] = ResolversParentTypes['ChannelMember']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isSubscribed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastSubscribedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  isStaked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currentStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalClaimed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastClaimedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionOutflowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionOutflowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  subscriber?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobalDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GlobalData'] = ResolversParentTypes['GlobalData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lastUpdatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalClaimed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionFlowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionFlowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionCashbackFlowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionCashbackFlowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNumberOfSubscriptions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNumberOfStakers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNumberOfChannels?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QuerychannelArgs, 'id' | 'subgraphError'>>;
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QuerychannelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  channelMember?: Resolver<Maybe<ResolversTypes['ChannelMember']>, ParentType, ContextType, RequireFields<QuerychannelMemberArgs, 'id' | 'subgraphError'>>;
  channelMembers?: Resolver<Array<ResolversTypes['ChannelMember']>, ParentType, ContextType, RequireFields<QuerychannelMembersArgs, 'skip' | 'first' | 'subgraphError'>>;
  globalData?: Resolver<Maybe<ResolversTypes['GlobalData']>, ParentType, ContextType, RequireFields<QueryglobalDataArgs, 'id' | 'subgraphError'>>;
  globalDatas?: Resolver<Array<ResolversTypes['GlobalData']>, ParentType, ContextType, RequireFields<QueryglobalDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  channel?: SubscriptionResolver<Maybe<ResolversTypes['Channel']>, "channel", ParentType, ContextType, RequireFields<SubscriptionchannelArgs, 'id' | 'subgraphError'>>;
  channels?: SubscriptionResolver<Array<ResolversTypes['Channel']>, "channels", ParentType, ContextType, RequireFields<SubscriptionchannelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  channelMember?: SubscriptionResolver<Maybe<ResolversTypes['ChannelMember']>, "channelMember", ParentType, ContextType, RequireFields<SubscriptionchannelMemberArgs, 'id' | 'subgraphError'>>;
  channelMembers?: SubscriptionResolver<Array<ResolversTypes['ChannelMember']>, "channelMembers", ParentType, ContextType, RequireFields<SubscriptionchannelMembersArgs, 'skip' | 'first' | 'subgraphError'>>;
  globalData?: SubscriptionResolver<Maybe<ResolversTypes['GlobalData']>, "globalData", ParentType, ContextType, RequireFields<SubscriptionglobalDataArgs, 'id' | 'subgraphError'>>;
  globalDatas?: SubscriptionResolver<Array<ResolversTypes['GlobalData']>, "globalDatas", ParentType, ContextType, RequireFields<SubscriptionglobalDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  userChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  currentStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalClaimed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastClaimedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUnstakedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numberOfSubscriptions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfStakes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSubscriptionOutflowRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSubscriptionOutflowAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  channels?: Resolver<Array<ResolversTypes['ChannelMember']>, ParentType, ContextType, RequireFields<UserchannelsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Channel?: ChannelResolvers<ContextType>;
  ChannelMember?: ChannelMemberResolvers<ContextType>;
  GlobalData?: GlobalDataResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = AlfaFrensTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/AlfaFrens/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const alfaFrensTransforms = [];
const additionalTypeDefs = [] as any[];
const alfaFrensHandler = new GraphqlHandler({
              name: "AlfaFrens",
              config: {"endpoint":"{context.url:https://api.goldsky.com/api/public/project_clsnd6xsoma5j012qepvucfpp/subgraphs/alfafrens/4.2.4/gn}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("AlfaFrens"),
              logger: logger.child("AlfaFrens"),
              importFn,
            });
alfaFrensTransforms[0] = new AutoPaginationTransform({
                  apiName: "AlfaFrens",
                  config: {"validateSchema":true,"limitOfRecords":1000},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'AlfaFrens',
          handler: alfaFrensHandler,
          transforms: alfaFrensTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "8603d7faf0a4d9f4a51319350b2284f66b392433e833d07b38158889c5f42369": GetUserSubsDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetUserSubsDocument,
        get rawSDL() {
          return printWithCache(GetUserSubsDocument);
        },
        location: 'GetUserSubsDocument.graphql',
        sha256Hash: '8603d7faf0a4d9f4a51319350b2284f66b392433e833d07b38158889c5f42369'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetUserSubsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type GetUserSubsQuery = { channelMembers: Array<(
    Pick<ChannelMember, 'id' | 'isSubscribed' | 'isStaked' | 'currentStaked' | 'totalClaimed' | 'lastUpdatedTimestamp' | 'lastClaimedTimestamp' | 'totalSubscriptionOutflowRate' | 'totalSubscriptionOutflowAmount' | 'status'>
    & { subscriber: Pick<User, 'id'>, channel: Pick<Channel, 'id'> }
  )> };


export const GetUserSubsDocument = gql`
    query GetUserSubs($id: String!, $first: Int, $skip: Int, $orderBy: ChannelMember_orderBy, $orderDirection: OrderDirection) {
  channelMembers(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: {subscriber: $id, isSubscribed: true}
  ) {
    id
    isSubscribed
    isStaked
    currentStaked
    totalClaimed
    lastUpdatedTimestamp
    lastClaimedTimestamp
    totalSubscriptionOutflowRate
    totalSubscriptionOutflowAmount
    status
    subscriber {
      id
    }
    channel {
      id
    }
  }
}
    ` as unknown as DocumentNode<GetUserSubsQuery, GetUserSubsQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetUserSubs(variables: GetUserSubsQueryVariables, options?: C): Promise<GetUserSubsQuery> {
      return requester<GetUserSubsQuery, GetUserSubsQueryVariables>(GetUserSubsDocument, variables, options) as Promise<GetUserSubsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;