import { dict } from '@glimmer/util';
import { CONSTANT_TAG, ConstReference, DirtyableTag, UpdatableTag, combine, isConst, } from '@glimmer/reference';
import { ConditionalReference as GlimmerConditionalReference, PrimitiveReference, } from '@glimmer/runtime';
import { tagForProperty } from '@glimmer/tracking';
/**
 * The base PathReference.
 */
export class ComponentPathReference {
    get(key) {
        return PropertyReference.create(this, key);
    }
}
export class CachedReference extends ComponentPathReference {
    constructor() {
        super(...arguments);
        this._lastRevision = null;
        this._lastValue = null;
    }
    value() {
        let { tag, _lastRevision, _lastValue } = this;
        if (!_lastRevision || !tag.validate(_lastRevision)) {
            _lastValue = this._lastValue = this.compute();
            this._lastRevision = tag.value();
        }
        return _lastValue;
    }
}
export class RootReference extends ConstReference {
    constructor() {
        super(...arguments);
        this.children = dict();
    }
    get(propertyKey) {
        let ref = this.children[propertyKey];
        if (!ref) {
            ref = this.children[propertyKey] = new RootPropertyReference(this.inner, propertyKey);
        }
        return ref;
    }
}
export class PropertyReference extends CachedReference {
    static create(parentReference, propertyKey) {
        if (isConst(parentReference)) {
            return new RootPropertyReference(parentReference.value(), propertyKey);
        }
        else {
            return new NestedPropertyReference(parentReference, propertyKey);
        }
    }
    get(key) {
        return new NestedPropertyReference(this, key);
    }
}
export class RootPropertyReference extends PropertyReference {
    constructor(parentValue, propertyKey) {
        super();
        this._parentValue = parentValue;
        this._propertyKey = propertyKey;
        this.tag = tagForProperty(parentValue, propertyKey);
    }
    compute() {
        return this._parentValue[this._propertyKey];
    }
}
export class NestedPropertyReference extends PropertyReference {
    constructor(parentReference, propertyKey) {
        super();
        let parentReferenceTag = parentReference.tag;
        let parentObjectTag = UpdatableTag.create(CONSTANT_TAG);
        this._parentReference = parentReference;
        this._parentObjectTag = parentObjectTag;
        this._propertyKey = propertyKey;
        this.tag = combine([parentReferenceTag, parentObjectTag]);
    }
    compute() {
        let { _parentReference, _parentObjectTag, _propertyKey } = this;
        let parentValue = _parentReference.value();
        _parentObjectTag.inner.update(tagForProperty(parentValue, _propertyKey));
        if (typeof parentValue === 'string' && _propertyKey === 'length') {
            return parentValue.length;
        }
        if (typeof parentValue === 'object' && parentValue) {
            return parentValue[_propertyKey];
        }
        else {
            return undefined;
        }
    }
}
export class UpdatableReference extends ComponentPathReference {
    constructor(value) {
        super();
        this.tag = DirtyableTag.create();
        this._value = value;
    }
    value() {
        return this._value;
    }
    update(value) {
        let { _value } = this;
        if (value !== _value) {
            this.tag.inner.dirty();
            this._value = value;
        }
    }
}
export class ConditionalReference extends GlimmerConditionalReference {
    static create(reference) {
        if (isConst(reference)) {
            let value = reference.value();
            return PrimitiveReference.create(value);
        }
        return new GlimmerConditionalReference(reference);
    }
}
export class TemplateOnlyComponentDebugReference extends ConstReference {
    constructor(name) {
        super(undefined);
        this.name = name;
    }
    get(propertyKey) {
        throw new Error(`You tried to reference {{${propertyKey}}} from the ${this.name} template, which doesn't have an associated component class. Template-only components can only access args passed to them. Did you mean {{@${propertyKey}}}?`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJlbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL2NvbXBvbmVudC9zcmMvcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFFTCxZQUFZLEVBQ1osY0FBYyxFQUNkLFlBQVksRUFDWixZQUFZLEVBQ1osT0FBTyxFQUNQLE9BQU8sR0FHUixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCxvQkFBb0IsSUFBSSwyQkFBMkIsRUFDbkQsa0JBQWtCLEdBQ25CLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixzQkFBc0I7SUFJMUMsR0FBRyxDQUFDLEdBQVc7UUFDYixPQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFnQixlQUFtQixTQUFRLHNCQUF5QjtJQUExRTs7UUFDVSxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDcEMsZUFBVSxHQUFRLElBQUksQ0FBQztJQWNqQyxDQUFDO0lBVkMsS0FBSztRQUNILElBQUksRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUU5QyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNsRCxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFFRCxPQUFPLFVBQVUsQ0FB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LENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaWN0IH0gZnJvbSAnQGdsaW1tZXIvdXRpbCc7XG5pbXBvcnQge1xuICBQYXRoUmVmZXJlbmNlLFxuICBDT05TVEFOVF9UQUcsXG4gIENvbnN0UmVmZXJlbmNlLFxuICBEaXJ0eWFibGVUYWcsXG4gIFVwZGF0YWJsZVRhZyxcbiAgY29tYmluZSxcbiAgaXNDb25zdCxcbiAgVGFnLFxuICBUYWdXcmFwcGVyLFxufSBmcm9tICdAZ2xpbW1lci9yZWZlcmVuY2UnO1xuaW1wb3J0IHtcbiAgQ29uZGl0aW9uYWxSZWZlcmVuY2UgYXMgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlLFxuICBQcmltaXRpdmVSZWZlcmVuY2UsXG59IGZyb20gJ0BnbGltbWVyL3J1bnRpbWUnO1xuaW1wb3J0IHsgdGFnRm9yUHJvcGVydHkgfSBmcm9tICdAZ2xpbW1lci90cmFja2luZyc7XG5cbi8qKlxuICogVGhlIGJhc2UgUGF0aFJlZmVyZW5jZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudFBhdGhSZWZlcmVuY2U8VD4gaW1wbGVtZW50cyBQYXRoUmVmZXJlbmNlPFQ+IHtcbiAgYWJzdHJhY3QgdmFsdWUoKTogVDtcbiAgYWJzdHJhY3QgZ2V0IHRhZygpOiBUYWc7XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogUGF0aFJlZmVyZW5jZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvcGVydHlSZWZlcmVuY2UuY3JlYXRlKHRoaXMsIGtleSk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhY2hlZFJlZmVyZW5jZTxUPiBleHRlbmRzIENvbXBvbmVudFBhdGhSZWZlcmVuY2U8VD4ge1xuICBwcml2YXRlIF9sYXN0UmV2aXNpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9sYXN0VmFsdWU6IGFueSA9IG51bGw7XG5cbiAgYWJzdHJhY3QgY29tcHV0ZSgpOiBUO1xuXG4gIHZhbHVlKCkge1xuICAgIGxldCB7IHRhZywgX2xhc3RSZXZpc2lvbiwgX2xhc3RWYWx1ZSB9ID0gdGhpcztcblxuICAgIGlmICghX2xhc3RSZXZpc2lvbiB8fCAhdGFnLnZhbGlkYXRlKF9sYXN0UmV2aXNpb24pKSB7XG4gICAgICBfbGFzdFZhbHVlID0gdGhpcy5fbGFzdFZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICB0aGlzLl9sYXN0UmV2aXNpb24gPSB0YWcudmFsdWUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2xhc3RWYWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdFJlZmVyZW5jZSBleHRlbmRzIENvbnN0UmVmZXJlbmNlPG9iamVjdD4ge1xuICBwcml2YXRlIGNoaWxkcmVuID0gZGljdDxSb290UHJvcGVydHlSZWZlcmVuY2U+KCk7XG5cbiAgZ2V0KHByb3BlcnR5S2V5OiBzdHJpbmcpOiBSb290UHJvcGVydHlSZWZlcmVuY2Uge1xuICAgIGxldCByZWYgPSB0aGlzLmNoaWxkcmVuW3Byb3BlcnR5S2V5XTtcblxuICAgIGlmICghcmVmKSB7XG4gICAgICByZWYgPSB0aGlzLmNoaWxkcmVuW3Byb3BlcnR5S2V5XSA9IG5ldyBSb290UHJvcGVydHlSZWZlcmVuY2UodGhpcy5pbm5lciwgcHJvcGVydHlLZXkpO1xuICAgIH1cblxuICAgIHJldHVybiByZWY7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5UmVmZXJlbmNlIGV4dGVuZHMgQ2FjaGVkUmVmZXJlbmNlPGFueT4ge1xuICBzdGF0aWMgY3JlYXRlKHBhcmVudFJlZmVyZW5jZTogUGF0aFJlZmVyZW5jZTxhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgaWYgKGlzQ29uc3QocGFyZW50UmVmZXJlbmNlKSkge1xuICAgICAgcmV0dXJuIG5ldyBSb290UHJvcGVydHlSZWZlcmVuY2UocGFyZW50UmVmZXJlbmNlLnZhbHVlKCksIHByb3BlcnR5S2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBOZXN0ZWRQcm9wZXJ0eVJlZmVyZW5jZShwYXJlbnRSZWZlcmVuY2UsIHByb3BlcnR5S2V5KTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBQYXRoUmVmZXJlbmNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgTmVzdGVkUHJvcGVydHlSZWZlcmVuY2UodGhpcywga2V5KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdFByb3BlcnR5UmVmZXJlbmNlIGV4dGVuZHMgUHJvcGVydHlSZWZlcmVuY2Uge1xuICB0YWc6IFRhZztcbiAgcHJpdmF0ZSBfcGFyZW50VmFsdWU6IG9iamVjdDtcbiAgcHJpdmF0ZSBfcHJvcGVydHlLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJlbnRWYWx1ZTogb2JqZWN0LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3BhcmVudFZhbHVlID0gcGFyZW50VmFsdWU7XG4gICAgdGhpcy5fcHJvcGVydHlLZXkgPSBwcm9wZXJ0eUtleTtcbiAgICB0aGlzLnRhZyA9IHRhZ0ZvclByb3BlcnR5KHBhcmVudFZhbHVlLCBwcm9wZXJ0eUtleSk7XG4gIH1cblxuICBjb21wdXRlKCk6IGFueSB7XG4gICAgcmV0dXJuICh0aGlzLl9wYXJlbnRWYWx1ZSBhcyBhbnkpW3RoaXMuX3Byb3BlcnR5S2V5XTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTmVzdGVkUHJvcGVydHlSZWZlcmVuY2UgZXh0ZW5kcyBQcm9wZXJ0eVJlZmVyZW5jZSB7XG4gIHB1YmxpYyB0YWc6IFRhZztcbiAgcHJpdmF0ZSBfcGFyZW50UmVmZXJlbmNlOiBQYXRoUmVmZXJlbmNlPGFueT47XG4gIHByaXZhdGUgX3BhcmVudE9iamVjdFRhZzogVGFnV3JhcHBlcjxVcGRhdGFibGVUYWc+O1xuICBwcml2YXRlIF9wcm9wZXJ0eUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudFJlZmVyZW5jZTogUGF0aFJlZmVyZW5jZTxhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGxldCBwYXJlbnRSZWZlcmVuY2VUYWcgPSBwYXJlbnRSZWZlcmVuY2UudGFnO1xuICAgIGxldCBwYXJlbnRPYmplY3RUYWcgPSBVcGRhdGFibGVUYWcuY3JlYXRlKENPTlNUQU5UX1RBRyk7XG5cbiAgICB0aGlzLl9wYXJlbnRSZWZlcmVuY2UgPSBwYXJlbnRSZWZlcmVuY2U7XG4gICAgdGhpcy5fcGFyZW50T2JqZWN0VGFnID0gcGFyZW50T2JqZWN0VGFnO1xuICAgIHRoaXMuX3Byb3BlcnR5S2V5ID0gcHJvcGVydHlLZXk7XG5cbiAgICB0aGlzLnRhZyA9IGNvbWJpbmUoW3BhcmVudFJlZmVyZW5jZVRhZywgcGFyZW50T2JqZWN0VGFnXSk7XG4gIH1cblxuICBjb21wdXRlKCkge1xuICAgIGxldCB7IF9wYXJlbnRSZWZlcmVuY2UsIF9wYXJlbnRPYmplY3RUYWcsIF9wcm9wZXJ0eUtleSB9ID0gdGhpcztcblxuICAgIGxldCBwYXJlbnRWYWx1ZSA9IF9wYXJlbnRSZWZlcmVuY2UudmFsdWUoKTtcblxuICAgIF9wYXJlbnRPYmplY3RUYWcuaW5uZXIudXBkYXRlKHRhZ0ZvclByb3BlcnR5KHBhcmVudFZhbHVlLCBfcHJvcGVydHlLZXkpKTtcblxuICAgIGlmICh0eXBlb2YgcGFyZW50VmFsdWUgPT09ICdzdHJpbmcnICYmIF9wcm9wZXJ0eUtleSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXJlbnRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgcGFyZW50VmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWx1ZVtfcHJvcGVydHlLZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRhYmxlUmVmZXJlbmNlPFQ+IGV4dGVuZHMgQ29tcG9uZW50UGF0aFJlZmVyZW5jZTxUPiB7XG4gIHB1YmxpYyB0YWc6IFRhZ1dyYXBwZXI8RGlydHlhYmxlVGFnPjtcbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50YWcgPSBEaXJ0eWFibGVUYWcuY3JlYXRlKCk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZTogVCkge1xuICAgIGxldCB7IF92YWx1ZSB9ID0gdGhpcztcblxuICAgIGlmICh2YWx1ZSAhPT0gX3ZhbHVlKSB7XG4gICAgICB0aGlzLnRhZy5pbm5lci5kaXJ0eSgpO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsUmVmZXJlbmNlIGV4dGVuZHMgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlIHtcbiAgc3RhdGljIGNyZWF0ZShyZWZlcmVuY2U6IFBhdGhSZWZlcmVuY2U8YW55Pikge1xuICAgIGlmIChpc0NvbnN0KHJlZmVyZW5jZSkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHJlZmVyZW5jZS52YWx1ZSgpO1xuICAgICAgcmV0dXJuIFByaW1pdGl2ZVJlZmVyZW5jZS5jcmVhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlKHJlZmVyZW5jZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnUmVmZXJlbmNlIGV4dGVuZHMgQ29uc3RSZWZlcmVuY2U8dm9pZD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGdldChwcm9wZXJ0eUtleTogc3RyaW5nKTogUGF0aFJlZmVyZW5jZTx1bmtub3duPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFlvdSB0cmllZCB0byByZWZlcmVuY2Uge3ske3Byb3BlcnR5S2V5fX19IGZyb20gdGhlICR7XG4gICAgICAgIHRoaXMubmFtZVxuICAgICAgfSB0ZW1wbGF0ZSwgd2hpY2ggZG9lc24ndCBoYXZlIGFuIGFzc29jaWF0ZWQgY29tcG9uZW50IGNsYXNzLiBUZW1wbGF0ZS1vbmx5IGNvbXBvbmVudHMgY2FuIG9ubHkgYWNjZXNzIGFyZ3MgcGFzc2VkIHRvIHRoZW0uIERpZCB5b3UgbWVhbiB7e0Ake3Byb3BlcnR5S2V5fX19P2BcbiAgICApO1xuICB9XG59XG4iXX0=