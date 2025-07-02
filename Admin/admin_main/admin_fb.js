function fizickoBrisanje() {
  if (!window.selectedDeleteId || !window.selectedDeleteTip) return;

  fetch(`${API_BASE_URL}/api/${window.selectedDeleteTip}/fizicko_brisanje/${window.selectedDeleteId}`, {
    method: "DELETE"
  })
    .then((res) => {
      if (!res.ok) throw new Error("❌ Greška prilikom fizičkog brisanja.");
      alert("✅ Uspešno fizičko brisanje.");
      closeDeleteConfirmModal();
      osveziTabelu(window.selectedDeleteTip);  // Funkcija koja osvežava prikaz
    })
    .catch((err) => alert(err.message));
}