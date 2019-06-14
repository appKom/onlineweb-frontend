import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'core/components/Router';
import { CompanyList } from './components/CompanyList';

const BASE_ROUTE = '/companies';

export const routes = {
  home: BASE_ROUTE + '/',
  detail: BASE_ROUTE + '/',
};

export const Companies = () => {
  return (
    <Switch>
      <Route exact path={routes.home} component={CompanyList} />
      <Route path={routes.detail + ':id'} component={() => <></>} />
    </Switch>
  );
};
