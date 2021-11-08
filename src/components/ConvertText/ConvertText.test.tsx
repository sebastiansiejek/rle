import { render } from '@testing-library/react';
import React from 'react';
import ConvertText, { ConvertTextProps } from './ConvertText';

describe('ConvertText', () => {
    const defaultProps: ConvertTextProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<ConvertText {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('ConvertText')).toBeTruthy();
    });
});
