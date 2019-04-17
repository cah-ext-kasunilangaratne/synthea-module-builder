// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import { renderComponent , expect } from '../../helpers/test_helper';

import SaveModule from './SaveModule';
import examplitis from '../../data/example_module'

const onHide = () => null;

it('renders save module modal wthout errors', () => {
  import("../../data/modules").then(modules => {
      renderComponent(SaveModule, { modules: examplitis, visible: false, onHide})
  });
});