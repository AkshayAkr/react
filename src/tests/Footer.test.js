import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  shallow(<Footer />);
});