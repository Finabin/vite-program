const showPrompt = (messageApi: any, text: string, type: string) => {
    messageApi.open({
        type: type,
        content: text,
    });
}

export default showPrompt;