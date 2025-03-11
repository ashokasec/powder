import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic();

export const FAST_COMPACT_MODEL = 'claude-3-haiku-20240307';
export const LLM_MODEL = FAST_COMPACT_MODEL