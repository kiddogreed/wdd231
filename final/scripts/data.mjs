// Fetches the Trentsy product catalog from a local JSON file.
export async function getProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Unable to load product data:', error);
        return [];
    }
}
