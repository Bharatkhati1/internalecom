export const notificationTemplates = {
    orderConfirmation: (orderId) => ({
      notification: {
        title: "Order Confirmation",
        body: `Your order #${orderId} has been received and is being processed!`,
      },
      type: "transaction",
    }),
    orderSubmitted: (orderId) => ({
      notification: {
        title: "Order Submitted",
        body: `Your order #${orderId} has been successfully submitted.`,
      },
      type: "transaction",
    }),
    paymentConfirmation: (amount) => ({
      title: "Payment Confirmation",
      body: `Payment of $${amount} has been successfully processed.`,
      type: "transaction",
    }),
    shippingUpdate: (trackingId) => ({
      title: "Shipping Update",
      body: `Your order has shipped! Track package #${trackingId}.`,
      type: "transaction",
    }),
    deliveryConfirmation: (productName) => ({
      title: "Delivery Confirmation",
      body: `Your ${productName} has been delivered to your address.`,
      type: "transaction",
    }),
    ticketUpdate: (ticketId, agentName) => ({
      title: "Ticket Update",
      body: `Support agent ${agentName} has responded to your ticket #${ticketId}.`,
      type: "support",
    }),
    serviceReminder: (productName, daysLeft) => ({
      title: "Service Reminder",
      body: `Your extended warranty for ${productName} expires in ${daysLeft} days.`,
      type: "support",
    }),
    appointmentConfirmation: (appointmentTime) => ({
      title: "Appointment Confirmation",
      body: `Your in-store tech support appointment is tomorrow at ${appointmentTime}.`,
      type: "support",
    }),
    refundStatus: (amount) => ({
      title: "Return/Refund Status",
      body: `Your refund of $${amount} has been processed.`,
      type: "support",
    }),
  };
  