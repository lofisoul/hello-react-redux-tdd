import {API_KEY} from '../../src/config';
import RestaurantList from '../../src/components/RestaurantList';

describe('Listing Restaurants', () => {
	it('shows restaurants from the server', () => {
		const sushiPlace = 'Sushi Place';
		const pizzaPlace = 'Pizza Place';

		cy.server({force404: true});
		cy.route({
			method: 'GET',
			url: `https://api.outsidein.dev/${API_KEY}/restaurants`,
			response: [
				{id: 1, name: sushiPlace},
				{id: 2, name: pizzaPlace},
			],
		});

		cy.visit('/');
		cy.contains(sushiPlace);
		cy.contains(pizzaPlace);
	});
});
