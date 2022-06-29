const UpperCamelCase = require("just-pascal-case");
//👆 convert hero_icon to HeroIcon

const template = (props) => {
	if (props?.svg) {
		return `
export const ${props.name}Icon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
        ${props.svg(`
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-active:scale-100 group-hover:scale-105 transition-transform"
                        : local.class
                    : local.basic
                    ? "w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform"
                    : "w-6 h-6"
            }
            width={\`$\{local.size || 24}px\`}
            height={\`$\{local.size || 24}px\`}
            {...others}
        `)}
    )
}`;
	} else if (props?.solid && props?.outline) {
		const [solidPack, ..._solidIcon] = props?.solid.split(":");
		const [outlinePack, ..._outlineIcon] = props?.outline.split(":");
		//  import Recevied  from "~icons/heroicons-outline/plus-circle"
		const SolidIconName =
			UpperCamelCase(solidPack) + UpperCamelCase(_solidIcon.join(""));
		const OutlineIconName =
			UpperCamelCase(outlinePack) + UpperCamelCase(_outlineIcon.join(""));
		return `
import ${SolidIconName} from "~icons/${solidPack}/${_solidIcon}";
import ${OutlineIconName} from "~icons/${outlinePack}/${_outlineIcon}";

export const ${props.name}Icon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <${OutlineIconName}
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={\`$\{local.size || 24}px\`}
            height={\`$\{local.size || 24}px\`}
            {...others}
        />
            <${SolidIconName}
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={\`$\{local.size || 24}px\`}
            height={\`$\{local.size || 24}px\`}
            {...others}
        />
    </span>
    )
}`;
	} else {
		const [pack, ..._name] = props?.path.split(":");
		//  import Recevied  from "~icons/heroicons-outline/plus-circle"
		const Recevied = UpperCamelCase(pack) + UpperCamelCase(_name.join(""));
		return `
import ${Recevied} from "~icons/${pack}/${_name}";
export const ${props.name}Icon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
        <${Recevied}
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-active:scale-100 group-hover:scale-105 transition-transform"
                        : local.class
                    : local.basic
                    ? "w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform"
                    : "w-6 h-6"
            }
            width={\`$\{local.size || 24}px\`}
            height={\`$\{local.size || 24}px\`}
            {...others}
        />
    )
}`;
	}
};

module.exports = template;
