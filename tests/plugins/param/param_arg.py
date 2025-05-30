from typing import Annotated, Any

from nonebot.adapters import Message
from nonebot.params import Arg, ArgPlainText, ArgPromptResult, ArgStr


async def arg(key: Message = Arg()) -> Message:
    return key


async def arg_str(key: str = ArgStr()) -> str:
    return key


async def arg_plain_text(key: str = ArgPlainText()) -> str:
    return key


async def annotated_arg(key: Annotated[Message, Arg()]) -> Message:
    return key


async def annotated_arg_str(key: Annotated[str, ArgStr()]) -> str:
    return key


async def annotated_arg_plain_text(key: Annotated[str, ArgPlainText()]) -> str:
    return key


async def annotated_arg_prompt_result(key: Annotated[Any, ArgPromptResult()]) -> Any:
    return key


# test dependency priority
async def annotated_prior_arg(key: Annotated[str, ArgStr("foo")] = ArgPlainText()):
    return key


async def annotated_multi_arg(
    key: Annotated[Annotated[str, ArgStr("foo")], ArgPlainText()],
):
    return key
