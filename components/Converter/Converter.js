const renderHTML = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Function to handle lists (bulleted/numbered)
  const renderList = (text) => {
    const listItems = text.split("\n").filter((item) => item.trim() !== "");
    if (text.includes("-") || text.includes("*")) {
      return (
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      );
    } else if (text.match(/^\d+\./)) {
      return (
        <ol>
          {listItems.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ol>
      );
    }
  };

  // Function to check if the response is a code block (HTML, CSS, JS)
  const isCodeBlock = (text) => {
    return text.includes("<pre><code>") || text.includes("```");
  };

  export { renderHTML, renderList, isCodeBlock };