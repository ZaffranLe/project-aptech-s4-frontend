import React from 'react';

import { CardColumns } from './../../../components';
import { UsersCardGrid } from "../../components/Users/UsersCardGrid";
import { Paginations } from "../../components/Paginations";

const UsersGrid = () => (
	<React.Fragment>
		<CardColumns>
			<UsersCardGrid />
		</CardColumns>
    </React.Fragment>
);

export default UsersGrid;