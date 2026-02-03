export function formatDate(dateString)
{
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(date);
}