import type { PieceContext } from '@sapphire/pieces';
import { resolveBoolean } from '../lib/resolvers/boolean';
import { Argument } from '../lib/structures/Argument';

export class CoreArgument extends Argument<boolean> {
	public constructor(context: PieceContext) {
		super(context, { name: 'boolean' });
	}

	public run(parameter: string, context: { readonly truths?: string[]; falses?: readonly string[] } & Argument.Context): Argument.Result<boolean> {
		const resolved = resolveBoolean(parameter, { truths: context.truths, falses: context.falses });
		return resolved.mapErrInto((identifier) =>
			this.error({
				parameter,
				identifier,
				message: 'The argument did not resolve to a boolean.',
				context
			})
		);
	}
}
