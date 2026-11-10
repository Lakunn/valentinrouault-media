<?php
/**
 * Outils SEO et GEO gratuits, un par page :
 * [vr_schema] [vr_hreflang] [vr_trafic] [vr_regex_gsc] [vr_llms].
 * Le formulaire est rendu ici, le calcul se fait dans assets/tools.js (chargé uniquement
 * sur les pages qui utilisent un outil). Aucune donnée n'est envoyée à un serveur.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function vr_tools_enqueue() {
	$file = get_template_directory() . '/assets/tools.js';
	wp_enqueue_script( 'vr-tools', get_template_directory_uri() . '/assets/tools.js', array(), (string) filemtime( $file ), array( 'strategy' => 'defer', 'in_footer' => true ) );
}

function vr_tool_wrap( $id, $title, $inner, $live = false ) {
	vr_tools_enqueue();
	return sprintf(
		'<div class="vr-tool" data-tool="%1$s" id="outil-%1$s"%4$s><p class="vr-tool-title">%2$s</p><form class="vr-tool-form" novalidate>%3$s</form><div class="vr-tool-result" aria-live="polite"></div><noscript><p>Cet outil nécessite JavaScript.</p></noscript></div>',
		esc_attr( $id ),
		esc_html( $title ),
		$inner,
		$live ? ' data-live="1"' : ''
	);
}

function vr_field( $name, $label, $control, $help = '', $extra_class = '' ) {
	$id = 'vr-' . $name . '-' . wp_unique_id();
	return sprintf(
		'<div class="vr-field%5$s" data-field="%6$s"><label for="%1$s">%2$s</label>%3$s%4$s</div>',
		esc_attr( $id ),
		esc_html( $label ),
		str_replace( '{id}', esc_attr( $id ), $control ),
		$help ? '<small>' . esc_html( $help ) . '</small>' : '',
		$extra_class ? ' ' . esc_attr( $extra_class ) : '',
		esc_attr( $name )
	);
}

function vr_input( $name, $placeholder = '', $type = 'text' ) {
	return sprintf( '<input id="{id}" type="%s" name="%s" placeholder="%s">', esc_attr( $type ), esc_attr( $name ), esc_attr( $placeholder ) );
}

function vr_textarea( $name, $placeholder = '', $rows = 5 ) {
	return sprintf( '<textarea id="{id}" name="%s" rows="%d" placeholder="%s"></textarea>', esc_attr( $name ), (int) $rows, esc_attr( $placeholder ) );
}

function vr_select( $name, array $options ) {
	$html = '<select id="{id}" name="' . esc_attr( $name ) . '">';
	foreach ( $options as $value => $label ) {
		$html .= '<option value="' . esc_attr( $value ) . '">' . esc_html( $label ) . '</option>';
	}
	return $html . '</select>';
}

function vr_checks( $name, array $items ) {
	$html = '<fieldset class="vr-checks"><legend class="screen-reader-text">' . esc_html( $name ) . '</legend>';
	foreach ( $items as $value => $item ) {
		$html .= sprintf(
			'<label><input type="checkbox" name="%1$s" value="%2$s"%3$s> %4$s</label>',
			esc_attr( $name ),
			esc_attr( $value ),
			! empty( $item['checked'] ) ? ' checked' : '',
			esc_html( $item['label'] )
		);
	}
	return $html . '</fieldset>';
}

/* 1. Générateur de données structurées ---------------------------------- */
add_shortcode(
	'vr_schema',
	function () {
		$f  = vr_field(
			'type',
			'Type de page',
			vr_select(
				'type',
				array(
					'Article'       => 'Article de blog ou actualité',
					'Organization'  => 'Organisation (page d\'accueil, à propos)',
					'LocalBusiness' => 'Commerce ou établissement local',
					'Product'       => 'Fiche produit',
					'Person'        => 'Personne (auteur, consultant)',
					'BreadcrumbList' => 'Fil d\'Ariane',
					'FAQPage'       => 'Questions fréquentes (FAQ)',
				)
			)
		);
		// Champs communs, affichés ou masqués selon le type (voir tools.js).
		$f .= vr_field( 'name', 'Nom ou titre', vr_input( 'name', 'ex. Recherches zéro clic : que faire ?' ), '', 'for-Article for-Organization for-LocalBusiness for-Product for-Person' );
		$f .= vr_field( 'url', 'Adresse de la page', vr_input( 'url', 'https://exemple.fr/page/', 'url' ), '', 'for-Article for-Organization for-LocalBusiness for-Product for-Person' );
		$f .= vr_field( 'image', 'Image (adresse complète)', vr_input( 'image', 'https://exemple.fr/image.jpg', 'url' ), '', 'for-Article for-Organization for-LocalBusiness for-Product for-Person' );
		$f .= vr_field( 'description', 'Description', vr_textarea( 'description', 'Une ou deux phrases.', 2 ), '', 'for-Organization for-LocalBusiness for-Product for-Person' );
		$f .= vr_field( 'author', 'Auteur', vr_input( 'author', 'ex. Valentin Rouault' ), '', 'for-Article' );
		$f .= vr_field( 'published', 'Date de publication', vr_input( 'published', '', 'date' ), '', 'for-Article' );
		$f .= vr_field( 'modified', 'Date de mise à jour', vr_input( 'modified', '', 'date' ), 'Facultatif.', 'for-Article' );
		$f .= vr_field( 'publisher', 'Éditeur (nom du site ou de la société)', vr_input( 'publisher', 'ex. Exemple Média' ), '', 'for-Article' );
		$f .= vr_field( 'logo', 'Logo (adresse complète)', vr_input( 'logo', 'https://exemple.fr/logo.png', 'url' ), '', 'for-Organization for-LocalBusiness' );
		$f .= vr_field( 'sameas', 'Profils officiels (un par ligne)', vr_textarea( 'sameas', "https://www.linkedin.com/company/…\nhttps://fr.wikipedia.org/wiki/…", 3 ), 'Ils aident Google et les IA à relier vos profils à la même entité.', 'for-Organization for-LocalBusiness for-Person' );
		$f .= vr_field( 'jobtitle', 'Fonction', vr_input( 'jobtitle', 'ex. Consultant SEO' ), '', 'for-Person' );
		$f .= vr_field( 'worksfor', 'Employeur', vr_input( 'worksfor', 'ex. Exemple SAS' ), '', 'for-Person' );
		$f .= vr_field( 'phone', 'Téléphone', vr_input( 'phone', '+33 1 23 45 67 89', 'tel' ), '', 'for-Organization for-LocalBusiness' );
		$f .= vr_field( 'street', 'Adresse', vr_input( 'street', '12 rue de l\'Exemple' ), '', 'for-LocalBusiness' );
		$f .= vr_field( 'postal', 'Code postal', vr_input( 'postal', '75011' ), '', 'for-LocalBusiness' );
		$f .= vr_field( 'city', 'Ville', vr_input( 'city', 'Paris' ), '', 'for-LocalBusiness' );
		$f .= vr_field( 'hours', 'Horaires', vr_input( 'hours', 'Mo-Fr 09:00-18:00, Sa 10:00-13:00' ), 'Format : jours en deux lettres anglaises (Mo, Tu, We, Th, Fr, Sa, Su) et heures sur 24 h.', 'for-LocalBusiness' );
		$f .= vr_field( 'brand', 'Marque', vr_input( 'brand', 'ex. Exemple' ), '', 'for-Product' );
		$f .= vr_field( 'sku', 'Référence (SKU)', vr_input( 'sku', 'ex. EX-123' ), '', 'for-Product' );
		$f .= vr_field( 'price', 'Prix (€)', vr_input( 'price', '49,90' ), '', 'for-Product' );
		$f .= vr_field( 'availability', 'Disponibilité', vr_select( 'availability', array( 'InStock' => 'En stock', 'OutOfStock' => 'Rupture de stock', 'PreOrder' => 'Précommande' ) ), '', 'for-Product' );
		$f .= vr_field( 'rating', 'Note moyenne des avis (sur 5)', vr_input( 'rating', '4,6' ), 'Uniquement des avis réels et visibles sur la page.', 'for-Product' );
		$f .= vr_field( 'reviews', 'Nombre d\'avis', vr_input( 'reviews', '128' ), '', 'for-Product' );
		$f .= vr_field( 'crumbs', 'Étapes du fil d\'Ariane (une par ligne : nom | adresse)', vr_textarea( 'crumbs', "Accueil | https://exemple.fr/\nBlog | https://exemple.fr/blog/\nRecherches zéro clic | https://exemple.fr/blog/zero-clic/", 4 ), '', 'for-BreadcrumbList' );
		$f .= vr_field( 'faq', 'Questions et réponses (une par ligne : question | réponse)', vr_textarea( 'faq', "Combien de temps dure un audit SEO ? | Comptez deux à quatre semaines selon la taille du site.\nFaut-il un llms.txt ? | Ce n'est pas obligatoire : aucun moteur ne s'est engagé à le lire.", 4 ), 'Le texte doit être identique à celui affiché sur la page.', 'for-FAQPage' );
		$f .= '<button class="btn" type="submit">Générer le code</button>';
		return vr_tool_wrap( 'schema', 'Générateur de données structurées (JSON-LD)', $f );
	}
);

/* 2. Générateur hreflang ------------------------------------------------- */
add_shortcode(
	'vr_hreflang',
	function () {
		$f  = vr_field( 'versions', 'Versions de la page (une par ligne : code langue-pays | adresse)', vr_textarea( 'versions', "fr-fr | https://exemple.com/fr/\nfr-ca | https://exemple.com/ca-fr/\nen-ca | https://exemple.com/ca-en/\nen | https://exemple.com/en/", 6 ), 'Code langue ISO 639-1 (fr, en, de…), suivi si besoin d\'un code pays ISO 3166-1 (fr, be, ca, ch…). Pour auditer un site existant, collez directement les balises <link rel="alternate" hreflang> de son code source.' );
		$f .= vr_field( 'xdefault', 'Version par défaut (x-default)', vr_input( 'xdefault', 'https://exemple.com/', 'url' ), 'La page affichée quand aucune langue ne correspond, souvent un sélecteur de pays. Facultatif.' );
		$f .= '<button class="btn" type="submit">Générer et vérifier</button>';
		return vr_tool_wrap( 'hreflang', 'Générateur et vérificateur de balises hreflang', $f );
	}
);

/* 3. Prévision de trafic SEO --------------------------------------------- */
add_shortcode(
	'vr_trafic',
	function () {
		$f  = vr_field( 'keywords', 'Mots-clés (un par ligne : mot-clé ; volume mensuel ; position actuelle ; CPC en € facultatif)', vr_textarea( 'keywords', "chaussures trail ; 9900 ; 14 ; 0,85\nchaussures trail femme ; 2400 ; 8 ; 0,70\nmeilleures chaussures trail ; 1600 ; 22", 7 ), 'Collez directement un export de Semrush, Ahrefs ou de la Search Console en séparant les colonnes par un point-virgule ou une tabulation. Laissez la position vide si la page n\'est pas classée.' );
		$f .= vr_field( 'target', 'Position visée', vr_select( 'target', array( '1' => 'Position 1', '2' => 'Position 2', '3' => 'Position 3', '5' => 'Position 5', '10' => 'Position 10' ) ) );
		$f .= vr_field( 'aio', 'Part des mots-clés avec un AI Overview (%)', vr_input( 'aio', '30' ), 'Mettez 0 pour ignorer. La baisse appliquée vient de l\'étude Ahrefs de février 2026.' );
		$f .= '<button class="btn" type="submit">Estimer</button>';
		return vr_tool_wrap( 'trafic', 'Prévision de trafic SEO', $f );
	}
);

/* 4. Expressions régulières pour la Search Console ---------------------- */
add_shortcode(
	'vr_regex_gsc',
	function () {
		$f  = vr_field( 'brand', 'Votre marque et ses variantes (une par ligne)', vr_textarea( 'brand', "valentin rouault\nvalentinrouault\nrouault", 3 ), 'Pensez aux fautes de frappe et aux écritures collées.' );
		$f .= vr_field( 'city', 'Villes ou zones visées (une par ligne)', vr_textarea( 'city', "paris\nlyon\nmontreal", 3 ), 'Facultatif, pour le filtre local.' );
		$f .= vr_field( 'topic', 'Mots de votre thématique (un par ligne)', vr_textarea( 'topic', "netlinking\nbacklink\nlien", 3 ), 'Facultatif : isole un sujet pour suivre ses clics à part.' );
		$f .= vr_field( 'minwords', 'Longue traîne : nombre de mots minimum', vr_select( 'minwords', array( '4' => '4 mots et plus', '5' => '5 mots et plus', '6' => '6 mots et plus', '8' => '8 mots et plus (requêtes conversationnelles)' ) ) );
		$f .= vr_field( 'sample', 'Tester sur vos requêtes (facultatif)', vr_textarea( 'sample', "comment faire du netlinking\nvalentin rouault seo\nmeilleur outil seo gratuit\nconsultant seo paris", 5 ), 'Collez la colonne « Requêtes » d\'un export de la Search Console : l\'outil compte ce que chaque filtre capte avant que vous l\'utilisiez.' );
		$f .= '<button class="btn" type="submit">Générer les filtres</button>';
		return vr_tool_wrap( 'regex', 'Filtres d\'expressions régulières pour la Search Console', $f );
	}
);

/* 5. Générateur de llms.txt ---------------------------------------------- */
add_shortcode(
	'vr_llms',
	function () {
		$f  = vr_field( 'site', 'Nom du site', vr_input( 'site', 'ex. Exemple Média' ) );
		$f .= vr_field( 'summary', 'Résumé en une ou deux phrases', vr_textarea( 'summary', 'Ce que fait le site, pour qui, et ce qu\'on y trouve.', 2 ) );
		$f .= vr_field( 'details', 'Informations utiles (facultatif)', vr_textarea( 'details', 'Ex. : contenus mis à jour chaque mois, tarifs en euros TTC, livraison en France métropolitaine.', 3 ) );
		$f .= vr_field( 'pages', 'Pages à mettre en avant (une par ligne : section | titre | adresse | description)', vr_textarea( 'pages', "Guides | Choisir un mot-clé | https://exemple.fr/mot-cle/ | méthode en cinq étapes\nGuides | Indexation Google | https://exemple.fr/indexation/ | diagnostiquer une page non indexée\nÀ propos | Qui sommes-nous | https://exemple.fr/a-propos/\nOptional | Archives 2024 | https://exemple.fr/2024/", 7 ), 'La section « Optional » regroupe ce qu\'un assistant peut ignorer si son contexte est limité.' );
		$f .= '<button class="btn" type="submit">Générer le fichier</button>';
		return vr_tool_wrap( 'llms', 'Générateur de fichier llms.txt', $f );
	}
);
