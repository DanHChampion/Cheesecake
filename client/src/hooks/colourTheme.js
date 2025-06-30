import getStaticFile from '../utils/getStaticFile';

export const applyCustomTheme = (themeVars) => {
    let style = document.getElementById('custom-theme');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-theme';
      document.head.appendChild(style);
    }
  
    style.innerHTML = `:root { ${Object.entries(themeVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')} }`;

    localStorage.setItem('custom-theme', JSON.stringify(themeVars));
};

export const removeCustomTheme = () => {
    const style = document.getElementById('custom-theme');
    if (style) {
      style.remove();
    }
}

export const getCustomTheme = () => {
  console.log('Fetching custom theme...');
    const user = JSON.parse(localStorage.getItem('userObject'));
    if (user && user.theme) {
      return fetch(getStaticFile(`/_themes/${user.theme}.json`))
        .then(res => res.json())
        .catch(() => null);
    }
    return Promise.resolve(null);
}


export default {
    applyCustomTheme,
    removeCustomTheme,
    getCustomTheme,
};