<template>
  <div class="quote-generator">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <p class="quote-text">"{{ quote.text }}"</p>
      <p class="quote-author">- {{ quote.author }}</p>
      <button @click="fetchQuote" class="new-quote-btn">New Quote</button>
      <button @click="copyToClipboard">Copy Quote</button>
      <br />
      <button @click="shareOnFacebook">Share to Facebook</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const quote = ref({ text: "", author: ""});
const loading = ref(false);

async function fetchQuote() {
  loading.value = true;
  try {
    const response = await fetch("/api/quotes");
    const data = await response.json();
    const fetchedQuote = data[0];

    quote.value = {
      text: fetchedQuote.q,
      author: fetchedQuote.a,
    };
  } catch (error) {
    quote.value = {
      text: "Could not load a quote.",
      author: "Error",
    };
  } finally {
    loading.value = false;
  }
}

onMounted(fetchQuote);

function copyToClipboard() {
  navigator.clipboard.writeText(`"${quote.value.text}" - ${quote.value.author}`);
  window.alert('Quote copied');
}

function shareOnFacebook() {
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}&quote=${encodeURIComponent(`"${quote.value.text}" - ${quote.value.author}`)}`;
  window.open(fbShareUrl, '_blank');

}

</script>

<style>
.quote-generator {
  text-align: center;
  padding: 20px;
}
.new-quote-btn {
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
