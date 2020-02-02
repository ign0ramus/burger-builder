import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
	let wrapper = null;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('should render one <NavigationItem/> element if not authenticated', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(1);
	});

	it('should render authentication <NavigationItem/> if not authenticated', () => {
		expect(
			wrapper.contains(
				<NavigationItem link='/auth'>Authenticate</NavigationItem>
			)
		).toEqual(true);
	});

	it('should render three <NavigationItem/> element if authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should render logout <NavigationItem/> if authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(
			wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
		).toEqual(true);
	});
});
