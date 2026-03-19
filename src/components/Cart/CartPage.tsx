'use client';

import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { placeOrder } from '@/src/lib/api/clientApi';
import { useCartStore } from '@/src/lib/store/cartStore';
import css from './CartPage.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-()]{7,}$/, 'Invalid phone number')
    .required('Phone is required'),
  address: Yup.string()
    .min(5, 'At least 5 characters')
    .required('Address is required'),
  paymentMethod: Yup.string().oneOf(['cash', 'bank']).required(),
});

/* ---------- sub-components ---------- */

function QtyCounter({
  value,
  onInc,
  onDec,
}: {
  value: number;
  onInc: () => void;
  onDec: () => void;
}) {
  return (
    <div className={css.qty}>
      <button
        type="button"
        className={css.qty_btn}
        onClick={onInc}
        aria-label="Increase"
      >
        +
      </button>
      <span className={css.qty_val}>{value}</span>
      <button
        type="button"
        className={css.qty_btn}
        onClick={onDec}
        aria-label="Decrease"
      >
        −
      </button>
    </div>
  );
}

/* ---------- main component ---------- */

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  async function handleSubmit(
    values: {
      name: string;
      email: string;
      phone: string;
      address: string;
      paymentMethod: string;
    },
    { resetForm }: { resetForm: () => void },
  ) {
    try {
      await placeOrder({
        name: values.name,
        address: values.address,
        photo: items[0]?.photo ?? '',
        products: items.reduce((sum, i) => sum + i.quantity, 0),
        price: total,
        order_date: new Date().toISOString(),
      });
      clearCart();
      resetForm();
      toast.success(
        'Your order has been placed successfully! We will contact you shortly.',
        {
          duration: 5000,
          style: {
            background: '#59b17a',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '14px 20px',
          },
          iconTheme: { primary: '#fff', secondary: '#59b17a' },
        },
      );
    } catch {
      toast.error('Failed to place order. Please try again.', {
        duration: 4000,
        style: { borderRadius: '12px', padding: '14px 20px' },
      });
    }
  }

  return (
    <section className={css.page}>
      <h1 className={css.title}>Cart</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          address: '',
          paymentMethod: 'cash',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className={css.card}>
              {/* ── LEFT ─────────────────────────── */}
              <div className={css.left}>
                {/* Shipping info */}
                <div className={css.section}>
                  <h2 className={css.section_title}>Enter shipping info</h2>
                  <p className={css.section_desc}>
                    Enter your delivery address where you get the product. You
                    can also send any other location where you send the
                    products.
                  </p>
                  <div className={css.fields_grid}>
                    <div className={css.field_group}>
                      <label className={css.label} htmlFor="name">
                        Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        placeholder="Enter text"
                        className={css.input}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className={css.error}
                      />
                    </div>
                    <div className={css.field_group}>
                      <label className={css.label} htmlFor="email">
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter text"
                        className={css.input}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className={css.error}
                      />
                    </div>
                    <div className={css.field_group}>
                      <label className={css.label} htmlFor="phone">
                        Phone
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        placeholder="Enter text"
                        className={css.input}
                      />
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className={css.error}
                      />
                    </div>
                    <div className={css.field_group}>
                      <label className={css.label} htmlFor="address">
                        Address
                      </label>
                      <Field
                        id="address"
                        name="address"
                        placeholder="Enter text"
                        className={css.input}
                      />
                      <ErrorMessage
                        name="address"
                        component="span"
                        className={css.error}
                      />
                    </div>
                  </div>
                </div>

                <hr className={css.divider} />

                {/* Payment method */}
                <div className={css.section}>
                  <h2 className={css.section_title}>Payment method</h2>
                  <p className={css.section_desc}>
                    You can pay us in a multiple way in our payment gateway
                    system.
                  </p>
                  <div className={css.radios}>
                    <label className={css.radio_label}>
                      <div
                        className={`${css.radio_circle} ${values.paymentMethod === 'cash' ? css.radio_circle_active : ''}`}
                        onClick={() => setFieldValue('paymentMethod', 'cash')}
                        role="radio"
                        aria-checked={values.paymentMethod === 'cash'}
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === 'Enter' &&
                          setFieldValue('paymentMethod', 'cash')
                        }
                      >
                        {values.paymentMethod === 'cash' && (
                          <span className={css.radio_dot} />
                        )}
                      </div>
                      <span>Cash On Delivery</span>
                    </label>
                    <label className={css.radio_label}>
                      <div
                        className={`${css.radio_circle} ${values.paymentMethod === 'bank' ? css.radio_circle_active : ''}`}
                        onClick={() => setFieldValue('paymentMethod', 'bank')}
                        role="radio"
                        aria-checked={values.paymentMethod === 'bank'}
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === 'Enter' &&
                          setFieldValue('paymentMethod', 'bank')
                        }
                      >
                        {values.paymentMethod === 'bank' && (
                          <span className={css.radio_dot} />
                        )}
                      </div>
                      <span>Bank</span>
                    </label>
                  </div>
                </div>

                <hr className={css.divider} />

                {/* Order details */}
                <div className={css.section}>
                  <h2 className={css.section_title}>Order details</h2>
                  <p className={css.section_desc}>
                    Shipping and additional costs are calculated based on values
                    you have entered.
                  </p>
                  <div className={css.total_row}>
                    <span className={css.total_label}>Total:</span>
                    <span className={css.total_value}>
                      ₴&nbsp;{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className={css.submit_btn}
                >
                  {isSubmitting ? 'Placing order…' : 'Place order'}
                </button>
              </div>

              {/* ── RIGHT ────────────────────────── */}
              <div className={css.right}>
                {items.length === 0 ? (
                  <p className={css.empty}>Your cart is empty.</p>
                ) : (
                  <ul className={css.items_list}>
                    {items.map((item) => (
                      <li key={item.itemId} className={css.item}>
                        <div className={css.item_top}>
                          <div className={css.item_image_wrap}>
                            {item.photo ? (
                              <Image
                                src={item.photo}
                                alt={item.name}
                                width={80}
                                height={80}
                                className={css.item_image}
                              />
                            ) : (
                              <div className={css.item_image_placeholder} />
                            )}
                          </div>
                          <div className={css.item_info}>
                            <div className={css.item_header}>
                              <span className={css.item_name}>{item.name}</span>
                              <span className={css.item_price}>
                                ₴&nbsp;{item.price.toFixed(2)}
                              </span>
                            </div>
                            {item.suppliers && (
                              <p className={css.item_desc}>{item.suppliers}</p>
                            )}
                          </div>
                        </div>
                        <div className={css.item_bottom}>
                          <QtyCounter
                            value={item.quantity}
                            onInc={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            onDec={() => {
                              if (item.quantity > 1)
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                );
                            }}
                          />
                          <button
                            type="button"
                            className={css.remove_btn}
                            onClick={() => removeItem(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
