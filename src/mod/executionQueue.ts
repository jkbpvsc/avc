import {AddressBook} from '../interfaces';
import {Controller} from './controller';

export function evaluate (
    controllers: Controller[],
): void {
    controllers.forEach(
        (controller: Controller) => controller.run(),
    );
}
