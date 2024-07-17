#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CartServiceStackKate } from '../lib/cdk-stack';

const app = new cdk.App();
new CartServiceStackKate(app, 'CartServiceStackKate', {
  tags: { createdBy: 'ekaterina.hubkina' },
});
