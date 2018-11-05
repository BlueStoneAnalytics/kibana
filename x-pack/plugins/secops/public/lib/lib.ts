/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IModule, IScope } from 'angular';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import React from 'react';
import { Observable } from 'rxjs';

export interface AppFrontendLibs {
  framework: AppFrameworkAdapter;
  apolloClient: AppApolloClient;
  observableApi: AppObservableApi;
}

export type AppTimezoneProvider = () => string;

export type AppApolloClient = ApolloClient<NormalizedCacheObject>;

export interface AppFrameworkAdapter {
  appState?: object;
  dateFormat?: string;
  kbnVersion?: string;
  scaledDateFormat?: string;
  timezone?: string;

  // tslint:disable-next-line:no-any
  setUISettings(key: string, value: any): void;
  // tslint:disable-next-line:no-any
  render(component: React.ReactElement<any>): void;
  // tslint:disable-next-line:no-any
  renderBreadcrumbs(component: React.ReactElement<any>): void;
}

export interface AppFrameworkAdapterConstructible {
  new (uiModule: IModule, timezoneProvider: AppTimezoneProvider): AppFrameworkAdapter;
}

export interface AppObservableApiPostParams<RequestBody extends {} = {}> {
  url: string;
  body?: RequestBody;
}

export type AppObservableApiResponse<BodyType extends {} = {}> = Observable<{
  status: number;
  response: BodyType;
}>;

export interface AppObservableApi {
  post<RequestBody extends {} = {}, ResponseBody extends {} = {}>(
    params: AppObservableApiPostParams<RequestBody>
  ): AppObservableApiResponse<ResponseBody>;
}

export interface AppUiKibanaAdapterScope extends IScope {
  // tslint:disable-next-line:no-any
  breadcrumbs: any[];
  // tslint:disable-next-line:no-any
  topNavMenu: any[];
}

export interface AppKibanaUIConfig {
  // tslint:disable-next-line:no-any
  get(key: string): any;
  // tslint:disable-next-line:no-any
  set(key: string, value: any): Promise<boolean>;
}

export interface AppKibanaAdapterServiceRefs {
  config: AppKibanaUIConfig;
  rootScope: IScope;
}

export type AppBufferedKibanaServiceCall<ServiceRefs> = (serviceRefs: ServiceRefs) => void;