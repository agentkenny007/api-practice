function optionTmpl (option) {
  return `<option value="${option.value}">${option.label}</option>`;
};

function selectTmpl (options) {
  var optionsHTML = options.map(optionTmpl);

  return `
    <select class="github-team">
      <option value=""></option>${optionsHTML}
    </select>`;
};

export {selectTmpl};
