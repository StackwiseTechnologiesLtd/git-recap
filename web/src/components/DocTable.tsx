export function DocTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-bg-panel/50">
            <th className="px-4 py-3 font-medium text-fg">{headers[0]}</th>
            <th className="px-4 py-3 font-medium text-fg">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-line last:border-0 hover:bg-bg-elevated/40 transition-colors group">
              <td className="px-4 py-3 align-top font-medium text-fg group-hover:text-accent transition-colors">{a}</td>
              <td className="px-4 py-3 align-top font-mono text-[13px] text-muted group-hover:text-fg transition-colors">
                {b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
