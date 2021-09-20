class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        inputMessage: '',
        submittedValue: this.state.email,
        submitted: true,
      });
    }, 3000);
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="submitted-message">
            Hello {this.state.submittedValue}, thank you for submitting!
          </div>
        ) : (
          <form
            onSubmit={this.onSubmit}
            method="post"
            className="form-newsletter"
          >
            <label htmlFor="email-newsletter">sign up for our newsletter</label>

            <div>
              <input
                type="text"
                name="email"
                id="email-newsletter"
                value={this.state.email}
                onChange={this.onInputChange}
                placeholder="your email address"
              ></input>

              {this.state.inputMessage.length > 0 ? (
                <div className="message">{this.state.inputMessage}</div>
              ) : null}
            </div>

            <button
              type="submit"
              title="Sign Up"
              disabled={this.state.busy}
              className={`${this.state.busy === true ? 'busy' : ''}`}
            >
              {this.state.busy ? (
                <i className="fas fa-spinner icon"></i>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);

class AddToCartButton extends React.Component {
  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent('cart:add', {
          detail: this.props.productId,
        }),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 1000);
  };

  render() {
    return (
      <div>
        <a
          className={`product-control ${
            this.state.added === true ? 'active' : ''
          } ${this.state.busy === true ? 'busy' : ''}`}
          type="button"
          title={
            this.state.added === true
              ? `Remove ${this.props.productId} from Cart`
              : 'Add to Cart'
          }
          onClick={this.onClick}
        >
          <span>
            {this.state.added === true ? (
              <i className="fas fa-plus-square icon"></i>
            ) : (
              <i className="far fa-plus-square icon"></i>
            )}
            {this.state.busy === true ? (
              <i className="fas fa-spinner icon-spin"></i>
            ) : (
              ''
            )}
          </span>
        </a>
      </div>
    );
  }
}

class AddToWishlistButton extends React.Component {
  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent('cart:add', {
          detail: this.props.productId,
        }),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 1000);
  };
  render() {
    return (
      <div>
        <a
          className={`product-control ${
            this.state.added === true ? 'active' : ''
          } ${this.state.busy === true ? 'busy' : ''}`}
          type="button"
          title={
            this.state.added === true
              ? `Remove ${this.props.productId} from Wishlist`
              : 'Add to Wishlist'
          }
          onClick={this.onClick}
        >
          <span>
            {this.state.added === true ? (
              <i className="fas fa-heart icon"></i>
            ) : (
              <i className="far fa-heart icon"></i>
            )}
            {this.state.busy === true ? (
              <i className="fas fa-spinner icon-spin"></i>
            ) : (
              ''
            )}
          </span>
        </a>
      </div>
    );
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;

    return [
      <AddToCartButton key="321" productId={productId}></AddToCartButton>,
      <AddToWishlistButton
        key="123"
        productId={productId}
      ></AddToWishlistButton>,
    ];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls key={index} productId={index}></ProductControls>,
    productTileControl,
  );
});
