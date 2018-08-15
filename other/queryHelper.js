/**
 * Create a SELECT query
 * @param {array} columns Columns to return 
 * @param {*} table Table to query
 * @param {dictionary} search Search parameters (WHERE)
 */
module.exports.select = (columns, table, search) => {
    let query = "SELECT "; // Base SQL query
    if (columns) query += columns.reduce((f1, f2) => `${f1}, ${f2}`); // Combine columns into single string
    query += ` FROM ${table}`;
    if (!search || !Object.keys(search).length) return query;
    query += " WHERE ";
    query +=
        Object.keys(search)
            .map(k => search[k].map(s => `${k}='${s}'`).reduce((s1, s2) => `${s1} OR ${s2}`))
            .reduce((s1, s2) => `(${s1}) AND (${s2})`); // Combine into single string
    return query;
}