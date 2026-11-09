<?php
/**
 * Outils SEO et GEO gratuits : [vr_serp], [vr_robots_ia], [vr_ga4_ia], [vr_aio].
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

function vr_field( $name, $label, $control, $help = '' ) {
	$id = 'vr-' . $name . '-' . wp_unique_id();
	return sprintf(
		'<div class="vr-field"><label for="%1$s">%2$s</label>%3$s%4$s</div>',
		esc_attr( $id ),
		esc_html( $label ),
		str_replace( '{id}', esc_attr( $id ), $control ),
		$help ? '<small>' . esc_html( $help ) . '</small>' : ''
	);
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

/* Aperçu dans les résultats de Google ----------------------------------- */
add_shortcode(
	'vr_serp',
	function () {
		$f  = vr_field( 'title', 'Balise title', '<input id="{id}" type="text" name="title" maxlength="200" placeholder="ex. Recherches zéro clic : que faire quand Google garde le trafic ?">' );
		$f .= vr_field( 'desc', 'Méta-description', '<textarea id="{id}" name="desc" rows="3" maxlength="400" placeholder="ex. Pourquoi le trafic organique baisse avec les AI Overviews, et trois stratégies pour rester visible."></textarea>' );
		$f .= vr_field( 'url', 'Adresse de la page', '<input id="{id}" type="text" name="url" placeholder="ex. https://exemple.fr/blog/recherches-zero-clic/">' );
		return vr_tool_wrap( 'serp', 'Aperçu dans Google', $f, true );
	}
);

/* Générateur robots.txt pour les robots d'IA ----------------------------- */
add_shortcode(
	'vr_robots_ia',
	function () {
		$bots = array(
			'GPTBot'               => array( 'label' => 'GPTBot (OpenAI) : entraînement des modèles' ),
			'OAI-SearchBot'        => array( 'label' => 'OAI-SearchBot (OpenAI) : recherche de ChatGPT', 'checked' => true ),
			'ChatGPT-User'         => array( 'label' => 'ChatGPT-User (OpenAI) : pages ouvertes à la demande d\'un utilisateur', 'checked' => true ),
			'ClaudeBot'            => array( 'label' => 'ClaudeBot (Anthropic) : entraînement des modèles' ),
			'Claude-SearchBot'     => array( 'label' => 'Claude-SearchBot (Anthropic) : recherche de Claude', 'checked' => true ),
			'Claude-User'          => array( 'label' => 'Claude-User (Anthropic) : pages ouvertes à la demande d\'un utilisateur', 'checked' => true ),
			'PerplexityBot'        => array( 'label' => 'PerplexityBot (Perplexity) : index de recherche', 'checked' => true ),
			'Google-Extended'      => array( 'label' => 'Google-Extended (Google) : entraînement et ancrage de Gemini, sans effet sur la recherche Google' ),
			'Applebot-Extended'    => array( 'label' => 'Applebot-Extended (Apple) : entraînement des modèles d\'Apple' ),
			'CCBot'                => array( 'label' => 'CCBot (Common Crawl) : corpus public réutilisé pour l\'entraînement' ),
			'meta-externalagent'   => array( 'label' => 'meta-externalagent (Meta) : entraînement des modèles' ),
		);
		$f  = '<p class="vr-tool-intro">Cochez les robots que vous <strong>autorisez</strong>. Les autres seront bloqués sur tout le site.</p>';
		$f .= vr_checks( 'bots', $bots );
		$f .= vr_field( 'sitemap', 'Adresse du sitemap (facultatif)', '<input id="{id}" type="text" name="sitemap" placeholder="ex. https://exemple.fr/sitemap.xml">' );
		$f .= '<button class="btn" type="submit">Générer les règles</button>';
		return vr_tool_wrap( 'robots', 'Règles robots.txt pour les robots d\'IA', $f );
	}
);

/* Expression régulière GA4 pour le trafic des assistants IA -------------- */
add_shortcode(
	'vr_ga4_ia',
	function () {
		$sources = array(
			'chatgpt\\.com|chat\\.openai\\.com' => array( 'label' => 'ChatGPT', 'checked' => true ),
			'perplexity'                         => array( 'label' => 'Perplexity', 'checked' => true ),
			'gemini\\.google'                    => array( 'label' => 'Gemini', 'checked' => true ),
			'copilot\\.microsoft|copilot\\.cloud\\.microsoft' => array( 'label' => 'Microsoft Copilot', 'checked' => true ),
			'claude\\.ai'                        => array( 'label' => 'Claude', 'checked' => true ),
			'chat\\.mistral\\.ai'                => array( 'label' => 'Le Chat (Mistral)', 'checked' => true ),
			'deepseek'                           => array( 'label' => 'DeepSeek', 'checked' => true ),
			'grok\\.com'                         => array( 'label' => 'Grok', 'checked' => true ),
			'meta\\.ai'                          => array( 'label' => 'Meta AI' ),
			'you\\.com'                          => array( 'label' => 'You.com' ),
		);
		$f  = vr_checks( 'src', $sources );
		$f .= '<button class="btn" type="submit">Générer l\'expression</button>';
		return vr_tool_wrap( 'ga4', 'Canal « Assistants IA » dans GA4', $f );
	}
);

/* Estimation de l'effet des AI Overviews -------------------------------- */
add_shortcode(
	'vr_aio',
	function () {
		$pos = array();
		for ( $i = 1; $i <= 10; $i++ ) {
			$pos[ $i ] = 'Position ' . $i;
		}
		$select = '<select id="{id}" name="pos">';
		foreach ( $pos as $v => $l ) {
			$select .= '<option value="' . esc_attr( $v ) . '">' . esc_html( $l ) . '</option>';
		}
		$select .= '</select>';
		$f  = vr_field( 'clics', 'Clics mensuels actuels de la page', '<input id="{id}" type="number" inputmode="numeric" name="clics" min="1" step="1" placeholder="ex. 1200">', 'Dans la Search Console, rapport Performances, filtré sur la page.' );
		$f .= vr_field( 'pos', 'Position moyenne', $select );
		$f .= vr_field( 'part', 'Part des impressions sur des requêtes avec AI Overview (%)', '<input id="{id}" type="number" inputmode="numeric" name="part" min="0" max="100" step="5" placeholder="ex. 40">', 'Estimation : comparez le rapport IA générative et le rapport Performances, ou vérifiez vos requêtes principales à la main.' );
		$f .= '<button class="btn" type="submit">Estimer</button>';
		return vr_tool_wrap( 'aio', 'Estimer l\'effet des AI Overviews sur une page', $f );
	}
);
