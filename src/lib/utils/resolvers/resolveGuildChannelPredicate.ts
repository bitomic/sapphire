import { err, ok, Result } from '../../parsers/Result';
import { resolveGuildChannel } from '../../resolvers';
import type { ChannelTypes, GuildBasedChannelTypes } from '@sapphire/discord.js-utilities';
import type { Identifiers } from '../../errors/Identifiers';
import type { Guild } from 'discord.js';
import type { Nullish } from '@sapphire/utilities';

export function resolveGuildChannelPredicate<TChannel extends GuildBasedChannelTypes, TError extends Identifiers>(
	parameter: string,
	guild: Guild,
	predicate: (channel: ChannelTypes | Nullish) => channel is TChannel,
	error: TError
): Result<TChannel, TError | Identifiers.ArgumentGuildChannelError> {
	const result = resolveGuildChannel(parameter, guild);
	if (!result.success) return result;
	if (predicate(result.value)) return ok(result.value);
	return err(error);
}