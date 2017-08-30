module.exports = ({options}) => ({
    plugins: {
        'postcss-import': {},
        'postcss-simple-vars': {},
        'postcss-css-variables': {},
        'postcss-nested': {},
        'autoprefixer': options.autoprefixer,
        'cssnano': {}
    }
});
