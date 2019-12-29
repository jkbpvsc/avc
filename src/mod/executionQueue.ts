import {AddressBook} from '../interfaces';
import {Controller} from './controller';

export function evaluate(
    controllers: Controller[],
): void {
    const sortedControllers = controllers;
    sortedControllers.forEach(
        (controller: Controller) => controller.run(),
    );
}
