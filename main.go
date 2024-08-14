package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func renderTemplate(w http.ResponseWriter, tmpl string) {
	tmpl = fmt.Sprintf("templates/%s.html", tmpl)
	t, err := template.ParseFiles(tmpl)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, nil)
}

// Manipulador para a página inicial
func baseHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "base")
}


func main() {
	// Rota para servir arquivos estáticos
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// Rota para a página inicial
	http.HandleFunc("/", baseHandler)

	// Inicia o servidor
	port := ":8080"
	fmt.Printf("Servidor rodando em http://localhost%s\n", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("Erro ao iniciar o servidor:", err)
	}
}
