import { Variant } from '@ninetailed/client-sdk-nextjs';

type ComponentWithAudience<T> = T & {
    sys: {
        id: string;
    };
    ntAudience: {
        sys: {
            id: string;
        };
        name: string;
    };
};

type ComponentWithNullableAudience<T> = T & {
    ntAudience: {
        sys: {
            id: string;
        };
        name: string | null;
    } | null;
};

type ComponentWithVariants<T> = T & {
    ntVariantsCollection: {
        items: (ComponentWithNullableAudience<Omit<T, 'ntVariantsCollection'>> | null)[];
    } | null;
};

export function unwrapVariants<T>(
    data: ComponentWithVariants<T>
): T & { variants: Variant<T>[] } {
    return {
        ...data,
        variants: (
            data.ntVariantsCollection?.items ??
            ([] as (ComponentWithNullableAudience<T> | null)[])
        )
            .filter(
                (variant): variant is ComponentWithAudience<T> =>
                    variant !== null && variant.ntAudience !== null,
            )
            .map((variant) => ({
                ...variant,
                id: variant.sys.id,
                audience: {
                    id: variant.ntAudience.sys.id,
                    name: variant.ntAudience.name,
                },
            })),
    };
}