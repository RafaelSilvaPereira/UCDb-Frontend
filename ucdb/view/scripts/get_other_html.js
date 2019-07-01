let other_dom = null; /*Isso é uma referencia a DOM que vai ser criada*/

async function get_html_to_other_dom(path) {
    let html =  await fetch(path).then(response => response.text());
    other_dom = html;
}

export {other_dom, get_html_to_other_dom};