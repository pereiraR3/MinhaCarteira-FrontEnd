import {AbstractTO} from './abstract-to.model';

export abstract class AbstractEntity extends AbstractTO{

    abstract getId(): number;

}