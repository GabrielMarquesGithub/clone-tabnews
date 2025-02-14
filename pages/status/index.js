import useSWR from "swr";

const fetchAPI = async (key) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
};

function formatDate(date) {
  return new Date(date).toLocaleString("pt-BR");
}

export default function Status() {
  const { data, isLoading, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
  });

  const databaseData = data?.dependencies?.database;
  let icon = "🟡";

  const hasError = !isLoading && error;
  const hasData = !hasError && data;

  if (hasError) {
    icon = "🔴";
  } else if (hasData) {
    icon = "🟢";
  }

  return (
    <div>
      <h1>Status {icon}</h1>
      {isLoading && <p>Carregando...</p>}
      {hasError && <p>Erro ao carregar os dados</p>}
      {hasData && (
        <>
          <p>Ultima atualização: {formatDate(data.updated_at)}</p>
          <p>Informações do banco de dados</p>
          <ul>
            <li>Database version: {databaseData.version}</li>
            <li>Database status: {databaseData.current_connections}</li>
            <li>Database uptime: {databaseData.max_connections}</li>
          </ul>
        </>
      )}
    </div>
  );
}
