---
title: Contact
description: Get in touch with House & Habit about a story, a product, a collaboration or your privacy.
---

Have a question about a story, a product we featured, a collaboration idea or your privacy? Send a note below and it comes straight to the editor, Vallari Gadre. We read every message and usually reply within two working days.

<form class="contact-form" method="POST" action="/api/contact">
  <label for="c-name">Your name</label>
  <input id="c-name" name="name" type="text" autocomplete="name" required maxlength="100">
  <label for="c-email">Your email</label>
  <input id="c-email" name="email" type="email" autocomplete="email" required maxlength="200">
  <label for="c-topic">What is it about?</label>
  <select id="c-topic" name="topic">
    <option>A story or product</option>
    <option>Collaboration or press</option>
    <option>Privacy or my data</option>
    <option>Something else</option>
  </select>
  <label for="c-msg">Message</label>
  <textarea id="c-msg" name="message" rows="6" required maxlength="4000"></textarea>
  <p class="contact-form__hp" aria-hidden="true"><label>Leave this empty <input name="company" tabindex="-1" autocomplete="off"></label></p>
  <button type="submit">Send message</button>
</form>

House & Habit is an independent home and lifestyle magazine based in Pune, India, written for readers in the United States.
