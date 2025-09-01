import {Deserializable} from './deserialize.model';
import {Serializable} from './serialize.model';

export abstract class AbstractTO implements Deserializable, Serializable{

    deserialize( input: any): this {
        Object.assign( this, input );
        return this;
    }

    serialize(): any {
        return Object.assign({}, this);
    }

}