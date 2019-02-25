import React from "react";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-adopt";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
