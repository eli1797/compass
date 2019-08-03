/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateLocationInput = {
  id?: string | null;
  name: string;
  latitude: number;
  longitude: number;
};

export type UpdateLocationInput = {
  id: string;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type DeleteLocationInput = {
  id?: string | null;
};

export type ModelLocationFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  latitude?: ModelFloatFilterInput | null;
  longitude?: ModelFloatFilterInput | null;
  and?: Array<ModelLocationFilterInput | null> | null;
  or?: Array<ModelLocationFilterInput | null> | null;
  not?: ModelLocationFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelFloatFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type CreateLocationMutation = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type UpdateLocationMutation = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type DeleteLocationMutation = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type GetLocationQuery = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type ListLocationsQuery = {
  __typename: "ModelLocationConnection";
  items: Array<{
    __typename: "Location";
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateLocationSubscription = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type OnUpdateLocationSubscription = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type OnDeleteLocationSubscription = {
  __typename: "Location";
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateLocation(
    input: CreateLocationInput
  ): Promise<CreateLocationMutation> {
    const statement = `mutation CreateLocation($input: CreateLocationInput!) {
        createLocation(input: $input) {
          __typename
          id
          name
          latitude
          longitude
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateLocationMutation>response.data.createLocation;
  }
  async UpdateLocation(
    input: UpdateLocationInput
  ): Promise<UpdateLocationMutation> {
    const statement = `mutation UpdateLocation($input: UpdateLocationInput!) {
        updateLocation(input: $input) {
          __typename
          id
          name
          latitude
          longitude
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateLocationMutation>response.data.updateLocation;
  }
  async DeleteLocation(
    input: DeleteLocationInput
  ): Promise<DeleteLocationMutation> {
    const statement = `mutation DeleteLocation($input: DeleteLocationInput!) {
        deleteLocation(input: $input) {
          __typename
          id
          name
          latitude
          longitude
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteLocationMutation>response.data.deleteLocation;
  }
  async GetLocation(id: string): Promise<GetLocationQuery> {
    const statement = `query GetLocation($id: ID!) {
        getLocation(id: $id) {
          __typename
          id
          name
          latitude
          longitude
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLocationQuery>response.data.getLocation;
  }
  async ListLocations(
    filter?: ModelLocationFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLocationsQuery> {
    const statement = `query ListLocations($filter: ModelLocationFilterInput, $limit: Int, $nextToken: String) {
        listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            latitude
            longitude
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListLocationsQuery>response.data.listLocations;
  }
  OnCreateLocationListener: Observable<
    OnCreateLocationSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateLocation {
        onCreateLocation {
          __typename
          id
          name
          latitude
          longitude
        }
      }`
    )
  ) as Observable<OnCreateLocationSubscription>;

  OnUpdateLocationListener: Observable<
    OnUpdateLocationSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateLocation {
        onUpdateLocation {
          __typename
          id
          name
          latitude
          longitude
        }
      }`
    )
  ) as Observable<OnUpdateLocationSubscription>;

  OnDeleteLocationListener: Observable<
    OnDeleteLocationSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteLocation {
        onDeleteLocation {
          __typename
          id
          name
          latitude
          longitude
        }
      }`
    )
  ) as Observable<OnDeleteLocationSubscription>;
}
