// Fetch items from the API
async function fetchItems() {
    try {
        const response = await fetch('https://nmzggks95b.execute-api.us-east-2.amazonaws.com/');
        const items = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

// Generate table based on items and price limit
function generateTable(items, priceLimit, nameFilter, typeBlacklist, brandBlacklist) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing content
    let odd = true;


    // Table Creation
    i = 0;
    items.every(item => {
        if (parseFloat(item.price) <= priceLimit && item.name.toLowerCase().includes(nameFilter.toLowerCase()) && !typeBlacklist.includes(item.type) && !brandBlacklist.includes(item.brand)) {
            if(i > 10) {
                return false;
            }
            const row = document.createElement('tr');

            const type = document.createElement('td');
            type.setAttribute("col", 1);
            type.textContent = item.type;
            row.appendChild(type);

            const brand = document.createElement('td');
            brand.setAttribute("col", 2);
            brand.textContent = item.brand;
            row.appendChild(brand);

            const name = document.createElement('td');
            name.setAttribute("col", 3);
            row.appendChild(name);

            const price = document.createElement('td');
            price.setAttribute("col", 4);
            price.textContent = '$' + item.price;
            row.appendChild(price);

            const link = document.createElement('a');
            link.setAttribute('href', item.url);
            link.textContent = item.name;
            name.appendChild(link);


            row.className = odd ? "odd" : "even";

            tableBody.appendChild(row);

            odd = !odd;
            i++;
            console.log(item.name)
        }
        return true;
    });
}

function generateCheckbox(items) {
    //////////////////////////////
    /* TYPE CHECKBOX GENERATOR */
    //////////////////////////////
    const typeCheckboxSection = document.getElementById("type-checkboxes");
    const distinctTypes = [...new Set(items.map(item => item.type))];
    distinctTypes.sort((a, b) => a.localeCompare(b))

    distinctTypes.forEach(type => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox type";
        checkbox.id = `${type}-checkbox`;
        checkbox.name = type;
        checkbox.checked = true;

        const label = document.createElement("label");
        label.htmlFor = `${type}-checkbox`;
        label.textContent = type;

        const wrapper = document.createElement("div");
        wrapper.className = "type-checkbox-item"
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        typeCheckboxSection.appendChild(wrapper);

        checkbox.addEventListener("change", function() {
            if (!this.checked) {
                // Add to blacklist when unchecked
                if (!blacklisted_types.includes(checkbox.name)) {
                    blacklisted_types.push(checkbox.name);
                }
            } else {
                // Remove from blacklist when checked
                const index = blacklisted_types.indexOf(checkbox.name);
                if (index > -1) {
                    blacklisted_types.splice(index, 1);
                }
            }
            generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
        })
    });

    const deselectType = document.getElementById("type-deselect");
    deselectType.addEventListener('click', function() {
        document.querySelectorAll('.checkbox.type').forEach(checkbox => {
            if (!blacklisted_types.includes(checkbox.name)) {
                blacklisted_types.push(checkbox.name);
            }
            checkbox.checked = false;
        });
        generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
    });

    //////////////////////////////
    /* BRAND CHECKBOX GENERATOR */
    //////////////////////////////
    const brandCheckboxSection = document.getElementById("brand-checkboxes");
    const distinctBrands = [...new Set(items.map(item => item.brand))];
    distinctBrands.sort((a, b) => a.localeCompare(b)).filter((brand) => brand.name != "")

    distinctBrands.forEach(brand => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox brand";
        checkbox.id = `${brand}-checkbox`;
        checkbox.name = brand;
        checkbox.checked = true;

        const label = document.createElement("label");
        label.htmlFor = `${brand}-checkbox`;
        label.textContent = brand;

        const wrapper = document.createElement("div");
        wrapper.className = "brand-checkbox-item"
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        brandCheckboxSection.appendChild(wrapper);

        checkbox.addEventListener("change", function() {
            if (!this.checked) {
                // Add to blacklist when unchecked
                if (!blacklisted_brands.includes(checkbox.name)) {
                    blacklisted_brands.push(checkbox.name);
                }
            } else {
                // Remove from blacklist when checked
                const index = blacklisted_brands.indexOf(checkbox.name);
                if (index > -1) {
                    blacklisted_brands.splice(index, 1);
                }
            }
            generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
        })
    });

    const deselectBrand = document.getElementById("brand-deselect");
    deselectBrand.addEventListener('click', function() {
        document.querySelectorAll('.checkbox.brand').forEach(checkbox => {
            if (!blacklisted_brands.includes(checkbox.name)) {
                blacklisted_brands.push(checkbox.name);
            }
            checkbox.checked = false;
        });
        generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
    });

}

function sortItems(items) {
    items.sort((a, b) => {
        return parseFloat(a.price) > parseFloat(b.price) ? -1 : 1;
    });
}

// Initialize the page
async function initPage() {
    const items = await fetchItems();
    sortItems(items);

    num_items = items.length


    const price_limit_input = document.getElementById('price-limit-input');
    price_limit_input.addEventListener('input', function() {
        priceLimit = parseFloat(price_limit_input.value) || 1000000;
        generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
    });
    const name_input = document.getElementById('name-input');

    name_input.addEventListener('input', function() {
        name = name_input.value;
        generateTable(items, priceLimit, name_input.value, blacklisted_types, blacklisted_brands);
    });

    generateCheckbox(items);
    generateTable(items, priceLimit, name, blacklisted_types, blacklisted_brands);
}

let blacklisted_types = [];
let blacklisted_brands = [];
let priceLimit = 100000;
let name = '';
// Call initPage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPage);