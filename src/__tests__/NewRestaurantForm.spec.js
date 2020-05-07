import React from 'react';
import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import {NewRestaurantForm} from '../components/NewRestaurantForm';

describe('NewRestaurantForm', () => {
	const restaurantName = 'Burger Joint';
	const requiredError = 'Name is required';

	let createRestaurant;
	let context;

	beforeEach(() => {
		createRestaurant = jest.fn().mockName('createRestaurant');
		context = render(
			<NewRestaurantForm createRestaurant={createRestaurant} />,
		);
	});

	describe('initially', () => {
		it('does not display a validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
	});

	describe('when filled in', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;
			await userEvent.type(
				getByPlaceholderText('Add Restaurant'),
				restaurantName,
			);
			userEvent.click(getByTestId('new-restaurant-submit-button'));

			return act(flushPromises);
		});

		it('calls createRestaurant with the name', () => {
			expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
		});

		it('clears the name', () => {
			const {getByPlaceholderText} = context;
			expect(getByPlaceholderText('Add Restaurant').value).toEqual('');
		});

		it('does not display a validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
	});

	describe('when empty', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;
			await userEvent.type(getByPlaceholderText('Add Restaurant'), '');
			userEvent.click(getByTestId('new-restaurant-submit-button'));

			return act(flushPromises);
		});

		it('displays a validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).not.toBeNull();
		});
	});

	describe('when correcting a validation error', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;
			await userEvent.type(getByPlaceholderText('Add Restaurant'), '');
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			await act(flushPromises);
			await userEvent.type(
				getByPlaceholderText('Add Restaurant'),
				restaurantName,
			);
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			return act(flushPromises);
		});

		it('clears the validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
	});
});
