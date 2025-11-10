// Theme helper for pages that don't load main.js
async function loadTheme(){
    try{
        const resp = await fetch(`/api/theme`);
        const data = await resp.json();
        if(data && data.theme){
            applyTheme(data.theme);
        }
    } catch(e){
        console.warn('Could not load theme:', e);
    }
}

function applyTheme(theme){
    if(!theme) theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const sel = document.getElementById('theme-select');
    if(sel) sel.value = theme;
}

async function saveTheme(theme){
    try{
        const resp = await fetch(`/api/theme`, {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({theme})
        });
        if(resp.ok){
            applyTheme(theme);
            alert('Theme updated');
        } else {
            const data = await resp.json();
            alert(data.error || 'Failed to save theme');
        }
    } catch(e){
        alert('Network error saving theme');
    }
}

function injectThemeSwitcher(){
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.right = '16px';
    wrapper.style.bottom = '16px';
    wrapper.style.zIndex = '9999';
    wrapper.style.display = 'flex';
    wrapper.style.gap = '8px';
    wrapper.style.alignItems = 'center';

    const select = document.createElement('select');
    select.id = 'theme-select';
    select.style.padding = '8px';
    select.style.borderRadius = '8px';
    select.style.border = '1px solid rgba(0,0,0,0.1)';
    select.innerHTML = `
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="solar">Solar</option>
        <option value="midnight">Midnight</option>
        <option value="pastel">Pastel</option>
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Apply';
    btn.className = 'btn btn-small';
    btn.style.padding = '8px 10px';
    btn.onclick = () => saveTheme(select.value);

    wrapper.appendChild(select);
    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);
}

// Initialize on pages
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    injectThemeSwitcher();
});
