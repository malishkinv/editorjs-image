import { make, isUrl } from './helpers';

/**
 * Renders control panel view
 *  - Embed image url
 */
export default class ControlPanel {
  /**
   * @param {{api: object, config: object, readOnly: Boolean, cssClasses: object, onSelectImage: Function}}
   *  api - Editorjs API
   *  config - Tool custom config
   *  readOnly - read-only mode flag
   *  cssClasses - Css class names
   *  onSelectImage - Image selection callback
   */
  constructor({
    api, config, cssClasses, onSelectImage, readOnly,
  }) {
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;

    this.cssClasses = {
      ...cssClasses,
      controlPanel: 'inline-image__control-panel',
      tabWrapper: 'inline-image__tab-wrapper',
      tab: 'inline-image__tab',
      embedButton: 'inline-image__embed-button',
      search: 'inline-image__search',
      imageGallery: 'inline-image__image-gallery',
      noResults: 'inline-image__no-results',
      imgWrapper: 'inline-image__img-wrapper',
      thumb: 'inline-image__thumb',
      active: 'active',
      hidden: 'panel-hidden',
      scroll: 'panel-scroll',
    };

    this.onSelectImage = onSelectImage;

    this.nodes = {
      loader: null,
      embedUrlTab: null,
      embedUrlPanel: null,
      imageGallery: null,
      searchInput: null,
    };

    this.showEmbedTab = this.config.embed ? this.config.embed.display : true
  }

  /**
   * Creates Control Panel components
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const wrapper = make('div', this.cssClasses.controlPanel);
    const tabWrapper = make('div', this.cssClasses.tabWrapper);
    const embedUrlTab = make('div', [this.cssClasses.tab, this.cssClasses.active], {
      innerHTML: 'Embed URL',
      onclick: () => this.showEmbedUrlPanel(),
    });

    const embedUrlPanel = this.renderEmbedUrlPanel();

    this.showEmbedTab && tabWrapper.appendChild(embedUrlTab);
    wrapper.appendChild(tabWrapper);
    this.showEmbedTab && wrapper.appendChild(embedUrlPanel);

    this.nodes.embedUrlPanel = this.showEmbedTab ? embedUrlPanel : null;
    this.nodes.embedUrlTab   = this.showEmbedTab ? embedUrlTab : null;

    return wrapper;
  }

  /**
   * Shows "Embed Url" control panel
   *
   * @returns {void}
   */
  showEmbedUrlPanel() {
    this.nodes.embedUrlTab.classList.add(this.cssClasses.active);
    this.nodes.embedUrlPanel.classList.remove(this.cssClasses.hidden);
  }

  /**
   * Creates "Embed Url" control panel
   *
   * @returns {HTMLDivElement}
   */
  renderEmbedUrlPanel() {
    const wrapper = make('div');
    const urlInput = make('div', [this.cssClasses.input, this.cssClasses.caption], {
      id: 'image-url',
      contentEditable: !this.readOnly,
    });
    const embedImageButton = make('div', [this.cssClasses.embedButton, this.cssClasses.input], {
      id: 'embed-button',
      innerHTML: 'Embed Image',
      onclick: () => this.embedButtonClicked(urlInput.innerHTML),
    });

    urlInput.dataset.placeholder = 'Enter image url...';

    wrapper.appendChild(urlInput);
    wrapper.appendChild(embedImageButton);

    return wrapper;
  }

  /**
   * OnClick handler for Embed Image Button
   *
   * @param {string} imageUrl embedded image url
   * @returns {void}
   */
  embedButtonClicked(imageUrl) {
    if (isUrl(imageUrl)) {
      this.onSelectImage({ url: imageUrl });
    } else {
      this.api.notifier.show({
        message: 'Please enter a valid url.',
        style: 'error',
      });
    }
  }
}
