// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import { renderComponent , expect } from '../../helpers/test_helper';

import LoadModule from './LoadModule';
import examplitis from '../../data/example_module'

const onHide = () => null;
const push = () => null;
const onLoadJSON = () => null;
const newModule = () => null;

it('renders load module modal wthout errors', () => {
  import("../../data/modules").then(modules => {
      renderComponent(LoadModule, { modules: examplitis, library: modules.default, visible: false, onHide, push, welcome: false, newModule })
  });
});