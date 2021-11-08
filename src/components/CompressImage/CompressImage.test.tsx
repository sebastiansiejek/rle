import { render } from '@testing-library/react';
import React from 'react';
import CompressImage, { CompressImageProps } from './CompressImage';

describe('CompressImage', () => {
    const defaultProps: CompressImageProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<CompressImage {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('CompressImage')).toBeTruthy();
    });
});
