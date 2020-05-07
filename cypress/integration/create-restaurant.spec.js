import {API_KEY} from '../../src/config';

describe('Creating a restaurant', () => {
	it('allows adding restaurants', () => {
		const restaurantId = 27;
		const restaurantName = 'Burger Joint';

		cy.server({force404: true});
		cy.route({
			method: 'GET',
			url: `https://api.outsidein.dev/${API_KEY}/restaurants`,
			response: [],
		});

		cy.route({
			method: 'POST',
			url: `https://api.outsidein.dev/${API_KEY}/restaurants`,
			response: {
				id: restaurantId,
				name: restaurantId,
			},
		}).as('addRestaurant');

		cy.visit('/');

		cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
		cy.contains('Add').click();
		cy.wait('@addRestaurant').its('requestBody').should('deep.equal', {
			name: restaurantName,
		});

		cy.contains(restaurantName);
	});
});
